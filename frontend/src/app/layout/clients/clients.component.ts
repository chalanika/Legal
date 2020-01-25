import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [routerTransition()]
})
export class ClientsComponent implements OnInit {
  currentUser;
  pendingClients;

  constructor(private _userService:UserService,private _appointmentService:AppointmentService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res; 
        this.getPendingClients(this.currentUser._id);   
      }, err => {
        console.log(err);
      }
    );
  }

  getPendingClients(id){
    this._appointmentService.getLawyersConfirmedAppointments(id).subscribe(
      res=>{
        this.pendingClients = res;
        console.log(this.pendingClients);
      },err=>{
        console.log(err);
      }
    );
  }
}
