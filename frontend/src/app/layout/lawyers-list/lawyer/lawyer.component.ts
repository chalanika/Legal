import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss']
})
export class LawyerComponent implements OnInit {
  
  @Input() lawyer; //get value from parent to child
  public isCollapsed = true;
  imageUrl;
  currentUser;
  currentUserType;
  
  constructor(private router:Router,private _userService:UserService) { }

  ngOnInit() {
    console.log(this.lawyer);
    this.getCurrentUser();
    this.displayLawyerPic();
       
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

  

}
