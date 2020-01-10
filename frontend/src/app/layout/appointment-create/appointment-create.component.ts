import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
  animations: [routerTransition()]
})
export class AppointmentCreateComponent implements OnInit {

  lawyer;
  constructor(private route:ActivatedRoute,private _user:UserService) { }

  ngOnInit() {
    const lawyerId = this.route.snapshot.params.lawyerId;
    this._user.getLawyer(lawyerId).subscribe(
      res => {
        this.lawyer = res;
        console.log(res);
      },
      error => console.log(error) 
    );

  }

}
