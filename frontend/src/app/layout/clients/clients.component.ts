import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [routerTransition()]
})
export class ClientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
