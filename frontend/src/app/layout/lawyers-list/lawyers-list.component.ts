import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-lawyers-list',
  templateUrl: './lawyers-list.component.html',
  styleUrls: ['./lawyers-list.component.scss'],
  animations: [routerTransition()]
})
export class LawyersListComponent implements OnInit {

  user;
  userType;
  lawyers;
  type:String;
  imageUrl;
  selectedCategory : String = '';
  categories : any =[
    'Family',
    'Business',
    'Criminal'
  ];

  constructor(private _userService:UserService) { }

  ngOnInit() {
    this._userService.viewLawyers().subscribe(
      res => {
        this.lawyers = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  //event handler for the radio button's change event
  radioChangeaHandler(event:any){
    this.selectedCategory = event.target.value;
    this.changedCategory(this.selectedCategory);
  }

  changedCategory(category:String){
    console.log(category);
    console.log("ccccccccc");
    if(category == 'Business'){
      this.type = "1";
      this.getLawyers(this.type);
    }
    if(category == 'Family'){
      this.type = "2";
      this.getLawyers(this.type);
    }
    if(category == 'Criminal'){
      this.type = "3";
      this.getLawyers(this.type);
    }
    if(category == 'All'){
      
      this._userService.viewLawyers().subscribe(
        res => {
          this.lawyers = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }
  }
  //display categorised lawyers
 getLawyers(category:String){
    console.log(category);
    this._userService.categorizedLawyers(category).subscribe(
      res => {
        this.lawyers = res;
        
        console.log(res);
      },
      error => console.log(error)
    );
  }

  

}
