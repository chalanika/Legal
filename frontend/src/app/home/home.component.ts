import { Component, OnInit } from '@angular/core';
import { Category } from '../core/models/category';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lawyers;
  area;
  category=this.lawyers;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.viewLawyers().subscribe(
      res => {
        this.lawyers = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  click(area: String) {
    if (area == 'Bussiness') {

      console.log(area);
      this._userService.categorizedLawyers(this.area).subscribe(
        res => {
          this.lawyers = res;

          console.log(res);
        },
        error => console.log(error)
      );
    }
    if (area == 'Family'){
      console.log(area);
      this._userService.categorizedLawyers(this.area).subscribe(
        res => {
          this.lawyers = res;

          console.log(res);
        },
        error => console.log(error)
      );
    }
    if (area == 'Real Estate Law'){
      console.log(area);
      this._userService.categorizedLawyers(this.area).subscribe(
        res => {
          this.lawyers = res;

          console.log(res);
        },
        error => console.log(error)
      );
    }
    if (area == 'Criminal Law'){
      console.log(area);
      this._userService.categorizedLawyers(this.area).subscribe(
        res => {
          this.lawyers = res;

          console.log(res);
        },
        error => console.log(error)
      );
    }
  }

}
