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
    
    loginForm: FormGroup = new FormGroup({
        nic:new FormControl(null,[Validators.minLength(10), Validators.maxLength(10), Validators.required]),
        //email:new FormControl(null,[Validators.email,Validators.required]),
        password:new FormControl(null,Validators.required)
    });
    constructor(
      public _router: Router,private _user:UserService
    ) {}

    ngOnInit() {}

    onLoggedin() {
        if(!this.loginForm.valid){
            console.log('Invalid');
            return;
        }
        // console.log(JSON.stringify(this.loginForm.value));
        this._user.login(JSON.stringify(this.loginForm.value))
        .subscribe(
            data=>{console.log(data);this._router.navigate(['/dashboard']);} ,
            error => console.log(error)
        )
        localStorage.setItem('isLoggedin', 'true');
    }
}
