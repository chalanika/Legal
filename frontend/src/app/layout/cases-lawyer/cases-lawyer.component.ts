import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { CaseService } from 'src/app/core/services/case.service';
import { Case } from 'src/app/core/models/case';


@Component({
  selector: 'app-cases-lawyer',
  templateUrl: './cases-lawyer.component.html',
  styleUrls: ['./cases-lawyer.component.scss'],
  animations: [routerTransition()]
})
export class CasesLawyerComponent implements OnInit {

  currentUser;
  areas;
  ongoingCases;
  closedCases;
  case1 = new Case;
  constructor(private _userService:UserService, private _caseService:CaseService) { }

  ngOnInit() {
    this.getCurrentUser();

  }

  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;
        if(this.currentUser.type == 'Lawyer'){
          this.areas = this.currentUser.area;
          this.getOngoingCases(this.currentUser._id);
          this.getClosedCase(this.currentUser._id);
        }
        console.log(this.currentUser);
      },err=>{
        console.log(err);
      }
    )
  }

  getOngoingCases(lawyerId){
    this._caseService.getOngoingCases(lawyerId).subscribe(
      res=>{
        this.ongoingCases = res;
        console.log(this.ongoingCases);
      },err=>{
        console.log(err);
      }
    )
  }
//edit is_closed to true
  editCase(newCase){
    newCase.is_closed = true;
    this._caseService.editCase(newCase._id,newCase).subscribe(
      res=>{
        console.log(res);
        this.getOngoingCases(this.currentUser._id);
        this.getClosedCase(this.currentUser._id);
      },err=>{
        console.log(err);
      }
    )
  }

  getClosedCase(lawyerId){
    this._caseService.getClosedCases(lawyerId).subscribe(
      res=>{
        this.closedCases = res;
        console.log(this.closedCases);
      },err=>{
        console.log(err);
      }
    )
  }

}
