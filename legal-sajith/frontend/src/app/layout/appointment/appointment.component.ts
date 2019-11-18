import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  animations: [routerTransition()]
})
export class AppointmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
