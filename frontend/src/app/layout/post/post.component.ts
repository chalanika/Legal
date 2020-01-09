import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [routerTransition()]
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
