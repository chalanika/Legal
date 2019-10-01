import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup , FormControl , Validators  } from '@angular/forms';
import { UserService } from '../user.service';
import { Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    registerForm: FormGroup = new FormGroup({
        username: new FormControl(null , [Validators.required]),
        nic: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10), Validators.required]),
        email: new FormControl(null , [Validators.email, Validators.required]),
        password: new FormControl(null , Validators.required),
        cpass: new FormControl(null , Validators.required)
    } )
    constructor(private _router:Router , private _userService:UserService) {}

    ngOnInit() {}

    register(){
        if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value))
        {
            console.log('Invalid Form');
            return;
        }

        this._userService.register(JSON.stringify(this.registerForm.value))
        .subscribe(
            data=> {console.log(data); this._router.navigate(['/login']);},
            error=> console.error(error)
        )
        // console.log(JSON.stringify(this.registerForm.value));
    }
}
