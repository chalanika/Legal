import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { UserService } from 'src/app/user.service';
import { Appointment } from 'src/app/core/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  animations: [routerTransition()]
})
export class AppointmentComponent implements OnInit {

  currentUser;
  appointments;
  newAppointment = new Appointment();
  
  constructor(private _appointmentService:AppointmentService,private _userService:UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;
        if(this.currentUser.type == "2"){
          this.getlawyerAppointments(this.currentUser._id);
        }    
      }, err => {
        console.log(err);
      }
    );
  }

  getlawyerAppointments(id){
    this._appointmentService.getLawyersAppointments(id).subscribe(
      res=>{
        this.appointments = res;
        console.log(this.appointments);
      },err=>{
        console.log(err);
      }
    )
  }
  confirmAppointment(id,appointment){
    this.newAppointment = appointment;
    console.log(this.newAppointment);
    this.newAppointment.isAccepted = true;
    this._appointmentService.editAppointment(id,this.newAppointment).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  rejectAppointment(id,appointment){
    this.newAppointment = appointment;
    console.log(this.newAppointment);
    this.newAppointment.isRejected = true;
    this.deleteAppoinment(this.newAppointment._id,this.newAppointment.lawyerId);
    this._appointmentService.editAppointment(id,this.newAppointment).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  deleteAppoinment(id,lawyerId){
    this._appointmentService.deleteAppointment(id).subscribe(
      res => {
        console.log(res);
        this.getlawyerAppointments(lawyerId);   
    }, err => {
      console.log(err);
    });
  }

}
