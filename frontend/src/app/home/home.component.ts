import { Component, OnInit } from '@angular/core';
import { Category } from '../core/models/category';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { CategoryService } from '../core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lawyers;
  area;
  categories;
  
  constructor(private _userService: UserService,private router:Router,private _categoryService:CategoryService) { }

  ngOnInit() {
   this._categoryService.getCategories().subscribe(
     res=>{
       this.categories = res;
       console.log(res);
     },err=>{
       console.log(err);
     }
   )
  }

  click(area: String) {
    console.log(area);
    this.router.navigate([`/lawyers/category/${area}`]);
  }

  getAllLawyers(){
    this._userService.viewLawyers().subscribe(
      res => {
        this.lawyers = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

}
