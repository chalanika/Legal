import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss']
})
export class LawyerComponent implements OnInit {
  @Input() lawyer;
  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
    console.log(this.lawyer);
  }

}
