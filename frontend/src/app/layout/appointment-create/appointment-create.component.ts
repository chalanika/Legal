import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Appointment } from 'src/app/core/models/appointment';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
  animations: [routerTransition()]
})
export class AppointmentCreateComponent implements OnInit {

  lawyer;
  imageUrl;
  lawyerId;
  currentUser;
  appointmentModel = new Appointment();

  constructor(private route:ActivatedRoute,private _userService:UserService ,private _appointmentService:AppointmentService,private router:Router) { }

  ngOnInit() {
    this.lawyerId = this.route.snapshot.params.lawyerId;
    this.getLawyer(this.lawyerId);
    this.getCurrentUser();
    

  }

  displayLawyerPic(){
    if(this.lawyer.image){
      var path = this.lawyer.image.replace(/\\/g, '/');
      path = path.replace(/public/g, '');
      this.imageUrl = 'http://localhost:3000/' + path; 
    }
  }

  getLawyer(lawyerId){
    this._userService.getLawyer(lawyerId).subscribe(
      res => {
        this.lawyer = res;
        console.log(res);
        this.displayLawyerPic();     
      },
      error => console.log(error) 
    );   
  }

  appointment(){
    this.appointmentModel.lawyerId = this.lawyerId;
    // this.appointmentModel.isAccepted = false;
    // this.appointmentModel.isRejected = false;
    this.appointmentModel.status = "Not Confirmed";
    this.appointmentModel.isAlert = false;
    this.appointmentModel.clientName = this.currentUser.username;
    this.appointmentModel.lawyerName = this.lawyer.username;
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
    console.log(this.appointmentModel);
    this._appointmentService.createAppointment(this.appointmentModel).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
    this.router.navigate(['/lawyers']);
  }

  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;
        this.appointmentModel.clientId = this.currentUser._id;
      }, err => {
        console.log(err);
      }
    );
  }

  

}
