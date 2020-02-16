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
  clientappointments;
  constructor(private _user: UserService, private _router: Router, private _notification: NotificationService) {}

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this._user.user()
    .subscribe(
        res => {
          this.currentUser = res;
          console.log(this.currentUser.type);
          this.loadData();
        },
        error => this._router.navigate(['/login'])
    );
  }

  loadData() {
    console.log('hai i am here');
    if (this.currentUser.type=='Lawyer'){
      console.log(this.currentUser._id);
      this._notification.getAppointmentNotification(this.currentUser._id).subscribe(
        res => {
          this.appointments = res;
          console.log(this.appointments);
          // console.log(this.appointments);
        }, err => {
          console.log(err);
        }
      );
    }
    if (this.currentUser.type=='Client') {
      console.log('cat');
      console.log(this.currentUser._id);
      this._notification.getClientApointments(this.currentUser._id).subscribe(
        res => {
          console.log('dog');
          this.clientappointments = res;
          console.log('ele');
          console.log(this.clientappointments);
        }, err => {
          console.log(err);
        }
      );
    }
  }

}
