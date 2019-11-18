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

    images;
    imageUrl: any = '../../assets/images/avatar2.jpg';

    types = [{'id': 'Admin', 'name':'Admin'}, {'id':'Lawyer', 'name': 'Lawyer'}, {'id':'Client', 'name': 'Client'}];
    areas = [{'id': 'Business', 'name':'Business'}, {'id':' Criminal', 'name': 'Criminal'}, {'id': 'Family', 'name': 'Family'}];

    userPoint = 0;
    nicPoint = 0;
    emailPoint = 0;
    passPoint = 0;
    trigger = 0;
    invalid = 0;
    info = 0;
    imageFile = null;

    registerForm: FormGroup = new FormGroup({
        type: new FormControl(null , [Validators.required]),
        username: new FormControl(null , [Validators.required , Validators.minLength(3)]),
        nic: new FormControl(null, [Validators.required , Validators.minLength(10)]),
        email: new FormControl(null , [Validators.email, Validators.required]),
        area: new FormControl(null , [Validators.required]),
        address: new FormControl(null),
        number: new FormControl(null),
        detail: new FormControl(null , [Validators.required]),
        password: new FormControl(null , [Validators.required , Validators.minLength(8)]),
        cpass: new FormControl(null , [Validators.required]),
        image: new FormControl(null)
    } );

    get type() {
        return this.registerForm.get('type');
    }
    get username() {
        return this.registerForm.get('username');
    }
    get nic() {
        return this.registerForm.get('nic');
    }
    get email() {
        return this.registerForm.get('email');
    }
    get address() {
        return this.registerForm.get('address');
    }
    get number() {
        return this.registerForm.get('number');
    }
    get area() {
        return this.registerForm.get('area');
    }
    get detail() {
        return this.registerForm.get('detail');
    }
    get password() {
        return this.registerForm.get('password');
    }
    get cpass() {
        return this.registerForm.get('cpass');
    }
    get image() {
        return this.registerForm.get('image');
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
        this.passPoint = 0;
        this.trigger = 0;
        this.invalid = 0;

        if(this.registerForm.controls.password.value == null || this.registerForm.controls.cpass.value == null || this.registerForm.controls.email.value == null || this.registerForm.controls.nic.value == null || this.registerForm.controls.username.value == null || this.registerForm.controls.type.value == null){
            this.trigger = 1;
            console.log('All fields are required!');
            this.asyncFunc();
            return;
        }
        if(this.registerForm.controls.password.value != this.registerForm.controls.cpass.value){
            this.passPoint = 1;
            console.log('Password and repeat password does not match');
            this.asyncFunc();
            return;
        }

        // if(!this.registerForm.valid){
        //     this.invalid = 1;
        //     console.log('Invalid Form!');
        //     this.asyncFunc();
        //     return;
        // }

        let data = new FormData();
        data.append('type', this.registerForm.controls.type.value);
        data.append('username', this.registerForm.controls.username.value);
        data.append('nic', this.registerForm.controls.nic.value);
        data.append('email', this.registerForm.controls.email.value);
        data.append('detail', this.registerForm.controls.detail.value);
        data.append('area', this.registerForm.controls.area.value);
        data.append('address', this.registerForm.controls.address.value);
        data.append('number', this.registerForm.controls.number.value);
        data.append('password', this.registerForm.controls.password.value);
        data.append('image', this.imageFile, this.imageFile['name']);

        // console.log(this.registerForm.controls.image.value);

        this._userService.register(data)
        .subscribe(
            data=> {console.log(data);this._router.navigate(['/login']);},
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
        // console.log(this.registerForm.controls.image.value);
    }

    callType(value){
        // console.log(value);
        this.info = value;
        return;
    }

    selectImage(event){
        if(event.target.files.length>0){
            const file = event.target.files[0];
            this.images = file;
        }
    }

    asyncFunc = (...args) => 
            new Promise(r => setTimeout(r , 2500))
            .then(() => {
                this.userPoint = 0;
                this.nicPoint = 0;
                this.emailPoint = 0;
                this.passPoint = 0;
                this.trigger = 0;
                this.invalid = 0;
            });
            // imageUpload(e) {
            //     const reader = new FileReader();
            //     //get the selected file from event
            //     let file = e.target.files[0];
            //     reader.onloadend = () => {
            //       //Assign the result to variable for setting the src of image element
            //       this.imageUrl = reader.result;
            //     }
            //     reader.readAsDataURL(file);
            //   }

            imageUpload(event:any) {
                const reader = new FileReader();
                if (event.target.files && event.target.files[0]) {
                    this.imageFile = event.target.files[0];
                    console.log(this.imageFile);

                    reader.onloadend = () => {
                        this.imageUrl = reader.result;
                      }
                      reader.readAsDataURL(this.imageFile);
                }
              }
}
