import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Rate } from 'src/app/core/models/Rate';
import { RateService } from 'src/app/core/services/rate.service';
import { Case } from 'src/app/core/models/case';
import { UserService } from 'src/app/user.service';


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
  rateModel = new Rate(0, " ");
  id = "5db5a209257a640a5cc844dc";
  clientId = "5dce03204ecd9729d4574d03";
  result;
  lawyer;
  currentUser;
  currentUserId;
  caseModel = new Case;

  @ViewChild('content') content

  constructor(private modalService: NgbModal, private _rateService: RateService, private _userService:UserService ){ }
  ngOnInit() {
    this._userService.user()
    .subscribe(
        res=>{
          this.currentUser = res;
          console.log('this is',res);
          this.currentUserId = this.currentUser._id;
          console.log(this.currentUserId);
          console.log(this.clientId);
          this.check();
        }
    )
    
    
    // this.open();
  }

  //check case is closed
  check() {
    this._rateService.isFinished(this.currentUserId).subscribe(
      res => {
        this.result = res;
        console.log(this.result);
        if (this.result.length > 0) {
          this.caseModel = this.result[0];
          if (this.caseModel.is_closed && !this.caseModel.is_rated) {
            this._userService.getLawyer(this.caseModel.lawyer_id).subscribe(
              res=>{
                this.lawyer = res;
                // console.log(res);
                this.open();

              }
            )
          }
        }
      }, err => {
        console.log(err);
      })
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

  saveRate(){
    console.log(this.rateModel);
    this._userService.rate(this.caseModel.lawyer_id,this.rateModel).subscribe(
      data=>console.log(data),
      error => console.log(error)
    )

  }


}
