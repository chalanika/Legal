import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    type;
   
    constructor( private _user:UserService , private _router:Router) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'Solve your Case by an Experienced Lawyer',
                text:
                    'Choose your lawyer according to your preferences!'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: '',
                text: ''
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: '',
                text:
                    ''
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `You have an appointment with Mr.Silva at 3 p.m. today`
            },
            {
                id: 2,
                type: 'warning',
                message: `You haven't response to the appointment send by Ms.Kanthi two days ago...`
            },
            {
                id: 3,
                type: 'success',
                message: `Your payment has done by Mr Kalpadeep today`
            }
        );

        this._user.user()
        .subscribe(
            data=>this.addName(data),
            error=>this._router.navigate(['/login'])
        )
    }

    addName(data){
        this.type = data.type;
        console.log(this.type);
    }

    ngOnInit() {
        
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }




}