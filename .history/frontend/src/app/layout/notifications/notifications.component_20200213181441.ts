import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { Appointment } from 'src/app/core/models/appointment';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [routerTransition()]
})
export class NotificationsComponent implements OnInit {

  currentUser;
  appointments;
  constructor(private _user:UserService, private _router:Router,private _notification:NotificationService) {}

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser(){
    console.log('user')
    this._user.user()
    .subscribe(
        res=>{
          this.currentUser = res; 
          console.log(this.currentUser._id);
          this
        },
        error=>this._router.navigate(['/login'])
    );
  }
  loadData(){
    console.log('loadData')
    console.log(this.currentUser)
    this._notification.getAppointmentNotification(this.currentUser._id).subscribe(
      res=>{
        this.appointments = res;
        console.log(this.appointments)
      },err=>{
        console.log(err);
      }
    )
  }

}