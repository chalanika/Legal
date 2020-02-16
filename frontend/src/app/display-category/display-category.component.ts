import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Rate } from '../core/models/Rate';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'danger',
  message: 'You must login first.',
}
];

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }
    .full {
      color: red;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: red;
    }
  `]
})
export class DisplayCategoryComponent implements OnInit {
 
  category;
  lawyers;
  rates;
  averageRate;
  rateModel = new Rate;
  imageUrl;
  sucess=0;
  alerts: Alert[];

  constructor(private route: ActivatedRoute, private _userService: UserService) { }

  ngOnInit() {
    this.category = this.route.snapshot.params.categoryName;
    console.log(this.category);
    this._userService.categorizedLawyers(this.category).subscribe(
      res => {
        this.lawyers = res;
        console.log(this.lawyers);
      },
      error => console.log(error)
    );
  }

 
  getMessage(){
    this.sucess = 1;
    this.alerts = Array.from(ALERTS);
  }

  
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  getLawyers(){
    
  }


}
