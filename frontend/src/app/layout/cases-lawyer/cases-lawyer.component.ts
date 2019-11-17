import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-cases-lawyer',
  templateUrl: './cases-lawyer.component.html',
  styleUrls: ['./cases-lawyer.component.scss'],
  animations: [routerTransition()]
})
export class CasesLawyerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
