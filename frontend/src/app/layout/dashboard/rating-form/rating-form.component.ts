import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Rate} from 'src/app/core/models/Rate';
import {RateService} from 'src/app/core/services/rate.service';         
               

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
  rateModel = new Rate(0," ");
  id = "5db5a209257a640a5cc844dc";

  @ViewChild('content') content

  constructor(private modalService: NgbModal, private _rateService:RateService) { }
  ngOnInit() {
    this.open();
  }
/*rating form modal*/
  
  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  saveRate(){
    console.log(this.rateModel);
    this._rateService.rate(this.id,this.rateModel).subscribe(
      data=>console.log(data),
      error => console.log(error)
    )
    
  }
  
}
