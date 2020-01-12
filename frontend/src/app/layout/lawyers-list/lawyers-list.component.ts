import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { AppointmentService } from 'src/app/core/services/appointment.service';



interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}
];

@Component({
  selector: 'app-lawyers-list',
  templateUrl: './lawyers-list.component.html',
  styleUrls: ['./lawyers-list.component.scss'],
  animations: [routerTransition()]
})
export class LawyersListComponent implements OnInit {
  alerts: Alert[];
  Booked;
  submitedUser;
  successBooking = 0;
  resultArray;
  currentUser;

  user;
  userType;
  lawyers;
  type: String;
  imageUrl;
  selectedCategory: String = '';
  categories: any = [
    'Family',
    'Business',
    'Criminal'
  ];

  constructor(private _userService: UserService, private _appointmentService: AppointmentService) { }

  ngOnInit() {
    this._userService.viewLawyers().subscribe(
      res => {
        this.lawyers = res;
        console.log(res);
      },
      error => console.log(error)
    );
    this.alerts = Array.from(ALERTS);
    this.getCurrentUser();


  }

  //event handler for the radio button's change event
  radioChangeaHandler(event: any) {
    this.selectedCategory = event.target.value;
    this.changedCategory(this.selectedCategory);
  }

  changedCategory(category: String) {
    console.log(category);
    console.log("ccccccccc");
    if (category == 'Business') {
      this.type = "1";
      this.getLawyers(this.type);
    }
    if (category == 'Family') {
      this.type = "2";
      this.getLawyers(this.type);
    }
    if (category == 'Criminal') {
      this.type = "3";
      this.getLawyers(this.type);
    }
    if (category == 'All') {

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
  getLawyers(category: String) {
    console.log(category);
    this._userService.categorizedLawyers(category).subscribe(
      res => {
        this.lawyers = res;

        console.log(res);
      },
      error => console.log(error)
    );
  }

  submitBooking() {
    this._appointmentService.getAppointment(this.currentUser._id).subscribe(
      res => {
        this.resultArray = res;
        console.log("ssssssssssssssssssssssssssssssssss");
        console.log(res);
        if (this.resultArray.length > 0) {
          this.submitedUser = this.resultArray[0];
          console.log(this.submitedUser.clientId);
          console.log(this.currentUser._id);
          if (this.submitedUser.clientId === this.currentUser._id && this.submitedUser.isAlert == false ) {
            this.successBooking = 1;
            this.editAppointment(this.submitedUser._id);
            console.log(this.successBooking);
          } else {
            console.log("pppppppppppppppppppppppppppppppppppp");
          }
        }

      }
    );
  }

  editAppointment(id){
    this.submitedUser.isAlert = true;
    console.log(this.submitedUser);
    return this._appointmentService.editAppointment(id,this.submitedUser).subscribe(res => {
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
      console.log(res);
    }, err => {
      console.log(err);
    });
  }


  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  getCurrentUser() {
    this._userService.user().subscribe(
      res => {
        this.currentUser = res;
        console.log("ccccccccccccccccccc");
        console.log(this.currentUser);
        if (this.currentUser.type === "3") {
          this.submitBooking();
        }

      }, err => {
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      }
    );

  }


}
