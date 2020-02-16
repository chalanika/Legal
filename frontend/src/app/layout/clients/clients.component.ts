import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Case } from 'src/app/core/models/case';
import { CaseService } from 'src/app/core/services/case.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [routerTransition()]
})
export class ClientsComponent implements OnInit {
  currentUser;
  pendingClients;
  clients;
  appointment;
  closeResult: string;
  caseModel = new Case;

  constructor(private _userService:UserService,private _appointmentService:AppointmentService,private modalService: NgbModal,private _caseService:CaseService) { }

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
        this.getClients(this.currentUser._id);
        console.log(this.pendingClients);
      },err=>{
        console.log(err);
      }
    );
  }

  //delete appointments after confirmed
  deleteAppointment(appointment){
    this._appointmentService.deleteAppointment(appointment._id).subscribe(
      res=>{
        console.log(res);
        this.getPendingClients(this.currentUser._id);
       
      },err=>{
        console.log(err);
      }
    )
  }

  //create new case
  openCase(client){
    this.caseModel.description = client.description,
    this.caseModel.lawyer_id = client.lawyerId;
    this.caseModel.lawyerName = client.lawyerName;
    this.caseModel.client_id = client.clientId;
    this.caseModel.clientName = client.clientName;
    this.caseModel.openedDate = new Date;
    this.caseModel.is_closed = false;
    this.caseModel.is_rated =false;
    console.log(this.caseModel);
    this._caseService.createCase(this.caseModel).subscribe(
      res=>{
        console.log(res); 
        this.getClients(client.lawyerId)   
      },err=>{
        console.log(err);
      }   
    );  
  }
//get clients after open a case
  getClients(id){
   this._caseService.getClients(id).subscribe(
     res=>{
       this.clients = res;
       console.log("ppppppppppppppppppppp");
       console.log(this.clients);
     },err=>{
       console.log(err);
     }
   )
  }

}
