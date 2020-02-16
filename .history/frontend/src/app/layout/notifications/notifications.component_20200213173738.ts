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
  constructor(private _user:UserService, private _router:Router) {
    this._user.user()
    .subscribe(
      res=>{
        this.currentUser = res; 
      }
        error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit() {
  }

  loadData(){

  }

}
