import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Rate } from 'src/app/core/models/Rate';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
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
export class LawyerComponent implements OnInit {
  
  @Input() lawyer; //get value from parent to child
  public isCollapsed = true;
  imageUrl;
  currentUser;
  currentUserType;
  rates;
  averageRate;
  alert=0;
  rateModel = new Rate();
  
  constructor(private router:Router,private _userService:UserService) { }

  ngOnInit() {
    console.log(this.lawyer);
    this.getCurrentUser();
    this.displayLawyerPic();
    this.getRates();
       
  }

  displayLawyerPic(){
    if(this.lawyer.image){
      var path = this.lawyer.image.replace(/\\/g, '/');
      path = path.replace(/public/g, '');
      this.imageUrl = 'http://localhost:3000/' + path; 
    }
  }

  appointment(){
    this.router.navigate([`/book/${this.lawyer._id}`]);
  }

  getCurrentUser(){
    this._userService.user().subscribe(
      res=>{
        this.currentUser = res;  
        this.currentUserType = this.currentUser.type;
 
      }, err => {
        console.log(err);
      }
    );
  }

  //get rate values
getRates(){
  let sum = 0;
  this._userService.getRate(this.lawyer._id).subscribe(
      res=>{
          this.rates = res;
          for (let i in this.rates){
              sum += this.rates[i].rate;
          }
          this.averageRate=sum/this.rates.length;
      },
      error=>console.log(error)
  )
}

delete(info){
  this._userService.deleteUser(info)
        .subscribe(
            data => {console.log(data);this.alert=1;this.asyncFunc();window.location.reload(); },
            error => {
                console.error(error);
                return;
            }
        );
}

asyncFunc = (...args) => 
            new Promise(r => setTimeout(r , 2500))
            .then(() => {
                this.alert = 0;
            });

}
