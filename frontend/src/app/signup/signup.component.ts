import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup , FormControl , Validators  } from '@angular/forms';
import { UserService } from '../user.service';
import { Router} from '@angular/router';
// import { UsernameValidators } from './username.validators';
// import { PassValidators } from './pass.validators';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    userPoint = 0;
    nicPoint = 0;
    emailPoint = 0;

    registerForm: FormGroup = new FormGroup({
        username: new FormControl(null , [Validators.required , Validators.minLength(3)]),
        nic: new FormControl(null, [Validators.required , Validators.minLength(10)]),
        email: new FormControl(null , [Validators.email, Validators.required]),
        password: new FormControl(null , [Validators.required , Validators.minLength(8)]),
        cpass: new FormControl(null , Validators.required)
    } );

    get username() {
        return this.registerForm.get('username');
    }
    get nic() {
        return this.registerForm.get('nic');
    }
    get email() {
        return this.registerForm.get('email');
    }
    get password() {
        return this.registerForm.get('password');
    }
    get cpass() {
        return this.registerForm.get('cpass');
    }
    constructor(private _router:Router , private _userService:UserService ) {}

    ngOnInit() {}

    // sleep(){
    //     var start = new Date().getTime();
    //     for(var i=0;i<1e7;i++){
    //         if((new Date().getTime()-start) > 5000){
    //             console.log('now');
    //             break;
    //         }
    //     }
    // }

    register(){
        this.userPoint = 0;
        this.nicPoint = 0;
        this.emailPoint = 0;
        if(!this.registerForm.valid || this.registerForm.controls.password.value != this.registerForm.controls.cpass.value){
            console.log('Invalid Form');
            return;
        }

        this._userService.register(JSON.stringify(this.registerForm.value))
        .subscribe(
            data=> {console.log(data); this._router.navigate(['/login']);},
            error=> {
                console.error(error);
                if(error.error === 1111){
                    this.userPoint = 1;
                    console.log('This username is already in use!');
                    this.asyncFunc();
                    return;
                }

                if(error.error === 1112){
                    this.nicPoint = 1;
                    console.log('This nic is already in use!');
                    this.asyncFunc();
                    return;
                }
                if(error.error === 1113){
                    this.emailPoint = 1;
                    console.log('This email is already in use!');
                    this.asyncFunc();
                    return;
                }
                return;
            }
        )
        // console.log(JSON.stringify(this.registerForm.value));
    }

    asyncFunc = (...args) => 
            new Promise(r => setTimeout(r , 1000))
            .then(() => {
                this.userPoint = 0;
                this.nicPoint = 0;
                this.emailPoint = 0;
            });
}
