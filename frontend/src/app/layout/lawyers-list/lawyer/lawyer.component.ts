import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss']
})
export class LawyerComponent implements OnInit {
  @Input() lawyer;
  public isCollapsed = true;
  imageUrl;

  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.lawyer);
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
    this.router.navigate([`/book/${this.lawyer._id}`])
  }

}
