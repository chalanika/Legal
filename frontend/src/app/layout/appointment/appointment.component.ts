import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { UserService } from 'src/app/user.service';
import { Appointment } from 'src/app/core/models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  animations: [routerTransition()]
})
export class AppointmentComponent implements OnInit {

  currentUser;
  confirmedAppointments;
  incomingAppointments;
  rejectedAppointments;
  newAppointment = new Appointment();
  
  constructor(private _appointmentService:AppointmentService,private _userService:UserService,private router:Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }
//get current users details
  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;
        if(this.currentUser.type == "Lawyer"){
          this.getlawyerConfirmedAppointments(this.currentUser._id);
          this.getlawyerIncomingAppointments(this.currentUser._id);
        }else{
          if(this.currentUser.type == "Client"){
            this.getclientConfirmedAppointments(this.currentUser._id);
            this.getclientRejectedAppointments(this.currentUser._id);
          }
        }    
      }, err => {
        console.log(err);
      }
    );
  }
//display confirmed appointments in clients appoinments
  getclientConfirmedAppointments(id){
    this._appointmentService.getClientsConfirmedAppointments(id).subscribe(
      res=>{
        this.confirmedAppointments = res;

      },err=>{
        console.log(err);
      }
    )
  }
  //display rejected appointments
  getclientRejectedAppointments(id){
    this._appointmentService.getClientsRejectedAppointments(id).subscribe(
      res=>{
        this.rejectedAppointments = res;
      },err=>{
        console.log(err);
      }
    )
  }
  //display confirmed appointments of lawyers 
  getlawyerConfirmedAppointments(id){
    this._appointmentService.getLawyersConfirmedAppointments(id).subscribe(
      res=>{
        this.confirmedAppointments = res;
      },err=>{
        console.log(err);
      }
    )
  }
  //display incoming appointments of lawyers
  getlawyerIncomingAppointments(id){
    this._appointmentService.getLawyersIncomingAppointments(id).subscribe(
      res=>{
        this.incomingAppointments = res;
      },err=>{
        console.log(err);
      }
    )
  }
  //lawyer confirm appointment
  confirmAppointment(id,appointment){
    this.newAppointment = appointment;
    console.log(this.newAppointment);
    this.newAppointment.status="Confirmed";
    this._appointmentService.editAppointment(id,this.newAppointment).subscribe(res => {
      this.getlawyerConfirmedAppointments(this.currentUser._id);
      this.getlawyerIncomingAppointments(this.currentUser._id);
      console.log(res);
      
    }, err => {
      console.log(err);
    });
  }
  //lawyer reject appointment
  rejectAppointment(id,appointment){
    this.newAppointment = appointment;
    this.newAppointment.status = "Rejected";
    console.log(this.newAppointment);
    this._appointmentService.editAppointment(id,this.newAppointment).subscribe(res => {
      this.getlawyerConfirmedAppointments(this.currentUser._id);
      this.getlawyerIncomingAppointments(this.currentUser._id);
      console.log(res);
      
    }, err => {
      console.log(err);
    });
  }

}
