import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { Appointment } from 'src/app/core/models/appointment';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../.history/frontend/src/app/core/services/notification.service_20200213171813';
import {NotificationService}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [routerTransition()]
})
export class NotificationsComponent implements OnInit {

  currentUser;
  appointments;
  constructor(private _user:UserService, private _router:Router) {
    this._user.user()
    .subscribe(
        res=>{
          this.currentUser = res; 
          console.log(this.currentUser.id);
        },
        error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit() {
  }

  loadData(){
    NotificationService.getAppli  (id).subscribe(
      res=>{
        this.confirmedAppointments = res;

      },err=>{
        console.log(err);
      }
    )
  }

}