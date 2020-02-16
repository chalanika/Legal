import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Rate } from 'src/app/core/models/Rate';
import { RateService } from 'src/app/core/services/rate.service';
import { Case } from 'src/app/core/models/case';
import { UserService } from 'src/app/user.service';
import { CaseService } from 'src/app/core/services/case.service';


@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styles: [`
  .star {
    font-size: 3rem;
  }
  .bad {
    color: gray;
  }
  .filled.bad {
    color: yellow;
  }

  .feedback{
    border:0;
    
  }
`]

})
export class RatingFormComponent implements OnInit {

  closeResult: string;
  currentRate = 0;
  rateModel = new Rate();
  result;
  lawyer;
  currentUser;
  currentUserId;
  caseModel = new Case();
  

  @ViewChild('content') content

  constructor(private modalService: NgbModal, private _rateService: RateService, private _userService: UserService, private _caseService: CaseService) { }
  ngOnInit() {
    this._userService.user()
      .subscribe(
        res => {
          this.currentUser = res;
          this.currentUserId = this.currentUser._id;
          if (this.currentUser.type == 'Client') {
            this.check(this.currentUserId);
          }

        }
      )
  }

  //check case is closed
  check(clientId) {
    this._caseService.getClientCase(clientId).subscribe(
      res => {
        this.result = res;
        if (this.result.length > 0) {
          this.caseModel = this.result[0];
          console.log(this.caseModel.is_closed);
          if (this.caseModel.is_closed && !this.caseModel.is_rated) {
            this.open();
          }
        }
      }, err => {
        console.log(err);
      }
    )
  }

  /*rating form modal*/
  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  saveRate() {
    console.log(this.rateModel);
    this._userService.rate(this.caseModel.lawyer_id, this.rateModel).subscribe(
      res=>{ 
        console.log(res);
        this.updateIsRated();
      },err=>{
        console.log(err);
      }
    )
  }

  updateIsRated(){
    this.caseModel.is_rated = true;
    this._caseService.updateClientRate(this.caseModel._id,this.caseModel).subscribe(
      res=>{
        console.log(res);
      },err=>{
        console.log(err);
      }
    )
  }

  

}
