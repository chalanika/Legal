import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    nicPoint = 0;
    passPoint = 0;
    logPoint = 0;
    reqMessage = 0;
    showMessage = 0;

    loginForm: FormGroup = new FormGroup({
        nic:new FormControl(null,Validators.required),
        //email:new FormControl(null,[Validators.email,Validators.required]),
        password:new FormControl(null,Validators.required)
    });

    get nic() {
        return this.loginForm.get('nic');
    }
    get password() {
        return this.loginForm.get('password');
    }

    constructor(
      public _router: Router,private _user:UserService
    ) {}

    ngOnInit() {}

    onLoggedin() {

        this.logPoint = 0;
        this.nicPoint = 0;
        this.passPoint = 0;

        if(this.loginForm.controls.nic.value == null || this.loginForm.controls.password.value == null){
            this.reqMessage = 1;
            console.log('All fields are required!');
            this.asyncFunc();
            return;
        }

        // if(!this.loginForm.valid){
        //     console.log('Invalid');
        //     return;
        // }
        // console.log(JSON.stringify(this.loginForm.value));
        this._user.login(JSON.stringify(this.loginForm.value))
        .subscribe(
            data=>{console.log(data);this.showMessage = 1;this.asyncFunc();this._router.navigate(['/dashboard']);} ,
            error => {
                if(error.error === 2112){
                    this.nicPoint = 1;
                    console.log('Username or password is incorrect!');
                    this.asyncFunc();
                    return;
                }
                if(error.error === 2113){
                    this.logPoint = 1;
                    console.log('Login Error!');
                    this.asyncFunc();
                    return;
                }
            }
        )
        localStorage.setItem('isLoggedin', 'true');
    }

    asyncFunc = (...args) => 
            new Promise(r => setTimeout(r , 4500))
            .then(() => {
                this.nicPoint = 0;
                this.passPoint = 0;
                this.logPoint = 0;
                this.reqMessage = 0;
                this.showMessage = 0;
            });
}
