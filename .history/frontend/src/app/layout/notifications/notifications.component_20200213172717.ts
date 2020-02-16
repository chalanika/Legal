import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { Appointment } from 'src/app/core/models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [routerTransition()]
})
export class NotificationsComponent implements OnInit {

  currentUser;
  appointments;
  constructor() { }

  ngOnInit() {
  }
  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;
        if(this.currentUser.type == "2"){
          this.getlawyerConfirmedAppointments(this.currentUser._id);
          this.getlawyerIncomingAppointments(this.currentUser._id);
        }else{
          if(this.currentUser.type == "3"){
            this.getclientConfirmedAppointments(this.currentUser._id);
            this.getclientRejectedAppointments(this.currentUser._id);
          }
        }    
      }, err => {
        console.log(err);
      }
    );
  }
  loadData(){

  }

}
