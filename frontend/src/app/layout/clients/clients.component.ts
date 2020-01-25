import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [routerTransition()]
})
export class ClientsComponent implements OnInit {
  currentUser;
  pendingClients;
  appointment;
  closeResult: string;

  constructor(private _userService:UserService,private _appointmentService:AppointmentService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
//edit appointments status
  createCase(appointment){
    appointment.status = 'opened';
    this._appointmentService.editAppointment(appointment._id,appointment).subscribe(
      res=>{
        console.log(res);

      },err=>{
        console.log(err);
      }
    );
  }
}
