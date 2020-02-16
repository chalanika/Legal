import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/core/services/case.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss'],
  animations: [routerTransition()]
})
export class ClientDisplayComponent implements OnInit {
  clientId;
  client;
  imageUrl;
  currentUser;
  cases;
  ongoingCases;
  closedCases;

  constructor(private route:ActivatedRoute, private _caseService:CaseService,private _userService:UserService) { }

  ngOnInit() {
    this.clientId=this.route.snapshot.params.clientId;
    this.getClientDetail();
    this.getCurrentUser();
  }

  getClientDetail(){
    this._userService.getClient(this.clientId).subscribe(
      res=>{
        this.client = res;
        console.log(this.client);
        this.displayClientPic();
      },err=>{
        console.log(err);
      }
    )
  }

  displayClientPic(){
    if(this.client.image){
      var path = this.client.image.replace(/\\/g, '/');
      path = path.replace(/public/g, '');
      this.imageUrl = 'http://localhost:3000/' + path; 
    }
  }

  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;
        this.getClientOngoingCases(this.currentUser._id);
        this.getClientClosedCases(this.currentUser._id);

      },err=>{
        console.log(err);
      }
    )
  }
//display ongoing cases belongs to client for lawyer
  getClientOngoingCases(lawyerId){
    this._caseService.getlawyerClientOngoingCases(lawyerId,this.clientId).subscribe(
      res=>{
        this.ongoingCases = res;
        console.log(this.ongoingCases);
      },err=>{
        console.log(err);
      }
    )
  }

  //display closed cases belongs to client for lawyer
  getClientClosedCases(lawyerId){
    this._caseService.getlawyerClientClosedCases(lawyerId,this.clientId).subscribe(
      res=>{
        this.closedCases = res;
        console.log(this.closedCases);
      },err=>{
        console.log(err);
      }
    )
  }

}
