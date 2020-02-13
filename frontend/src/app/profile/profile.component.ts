import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { FormGroup , FormControl , Validators  } from '@angular/forms';
import {Rate} from 'src/app/core/models/Rate';
import {RateService} from 'src/app/core/services/rate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    username:'';
    currentUserType;
    email:'';
    nic:'';
    image:'';
    detail;
    address;
    number;
    area;
    type;
    trigger1 = 0;
    trigger2 = 0;
    pushRightClass: string;
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    BASE_URL = location.origin;
    imageUrl =  'http://localhost:3000/images/avatar.jpg';

    profile = 1;
    notification = 0;
    pass = 0;
    edit = 0;
    delete = 0;
    all = 0;
  
    areas = [{'id': 'Business', 'name':'Business'}, {'id':' Criminal', 'name': 'Criminal'}, {'id': 'Family', 'name': 'Family'}];

    updatePasswordForm: FormGroup = new FormGroup({
      password: new FormControl(null , [Validators.required]),
      newpassword: new FormControl(null , [Validators.required]),
      conpassword: new FormControl(null , [Validators.required])
  } );

  updateMeForm: FormGroup = new FormGroup({
    uname: new FormControl(!null , [Validators.required , Validators.minLength(3)]),
    cnumber: new FormControl(true),
    caddress: new FormControl(true),
    updateArea: new FormControl(true , [Validators.required])
} );

  get password() {
    return this.updatePasswordForm.get('password');
}
  get newpassword() {
  return this.updatePasswordForm.get('newpassword');
}
  get conpassword() {
  return this.updatePasswordForm.get('conpassword');
}

get uname() {
  return this.updateMeForm.get('uname');
}

get cnumber() {
  return this.updateMeForm.get('cnumber');
}

get caddress() {
  return this.updateMeForm.get('caddress');
}

get updateArea() {
  return this.updateMeForm.get('updateArea');
}

    rateModel = new Rate(0,"");
    rates;
    currentUserId= "5dce02aa4ecd9729d4574d02";
    averageRate;

    @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(private translate: TranslateService, public router: Router , private _user:UserService , private _router:Router,private _rateService:RateService) {
    this.router.events.subscribe(val => {
      if (
          val instanceof NavigationEnd &&
          window.innerWidth <= 992 &&
          this.isToggled()
      ) {
          this.toggleSidebar();
      }
  });

  this._user.user()
  .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
  )

   }

   addName(data){
    this.username = data.username;
    this.nic = data.nic;
    this.email = data.email;
    this.image = data.image;
    this.detail = data.detail;
    this.address = data.address;
    this.number = data.number;
    if(data.number == 'null'){
      this.number = "Not Entered";
    }
    if(data.address == 'null'){
      this.address = "Not Entered";
    }
    if(data.detail == 'null'){
      this.detail = "Not Entered";
    }
    this.area = data.area;
    this.type = data.type;
    this.currentUserType = data.type; 
    this.currentUserId = data._id;
    if(this.type=='Lawyer'){
      console.log('Hi');
      this.getRates();
    }
    
    console.log(data.image);
    var path = data.image.replace(/\\/g, '/');
    path = path.replace(/public/g, '');
    console.log(path);
    if(data.image != null)
    this.imageUrl = 'http://localhost:3000/' + path;
}

linkImg(fileName) {
      // base_URL returns localhost:3000 or the production URL
      console.log(this.BASE_URL);
      // return `${this.BASE_URL}/backend/uploads/avatar.jpg`;
    }

  ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        

  }

  sendupdatePasswordRequest() {
    if(this.updatePasswordForm.controls.password.value==null || this.updatePasswordForm.controls.newpassword.value==null || this.updatePasswordForm.controls.conpassword.value==null){
      this.all = 1;
      console.log('All fields are required!');
      this.asyncFunc();
      return;
    }

    this._user.updatePassword(JSON.stringify(this.updatePasswordForm.value))
        .subscribe(
            data => {console.log(data); this._router.navigate(['/dashboard']);},
            error => {
                console.error(error);
                return;
            }
        );
  }

  updateMe(){

    if(this.updateMeForm.controls.uname.value == null || this.updateMeForm.controls.uname.value == ''){
      this.trigger1 = 1;
      console.log('Username is required!');
      this.asyncFunc();
      return;
    }

    if(this.updateMeForm.controls.updateArea.value == null || this.updateMeForm.controls.updateArea.value == ''){
      this.trigger2 = 1;
      console.log('Expertised area is required!');
      this.asyncFunc();
      return;
    }

    if(this.updateMeForm.controls.uname.value==true){
      this.updateMeForm.controls['uname'].setValue(this.username);
    }

    if(this.updateMeForm.controls.cnumber.value==true){
      this.updateMeForm.controls['cnumber'].setValue(this.number);
    }

    if(this.updateMeForm.controls.caddress.value==true){
      this.updateMeForm.controls['caddress'].setValue(this.address);
    }

    if(this.updateMeForm.controls.updateArea.value==true){
      this.updateMeForm.controls['updateArea'].setValue(this.area);
    }

    this._user.updateMe(JSON.stringify(this.updateMeForm.value))
        .subscribe(
            data => {console.log(data); this._router.navigate(['/dashboard']);},
            error => {
                console.error(error);
                return;
            }
        );
  }

  deleteMe(){
    this._user.deleteMe()
        .subscribe(
            data => {console.log(data); this._router.navigate(['/login']);},
            error => {
                console.error(error);
                return;
            }
        );
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
}

toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
}

rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
}

onLoggedout() {
    this._user.logout()
    .subscribe(
        data=>{console.log(data);this._router.navigate(['/login'])},
        error=>console.log(error)
    )
    localStorage.removeItem('isLoggedin');
}

changeLang(language: string) {
    this.translate.use(language);
}

eventCalled() {
  this.isActive = !this.isActive;
}

addExpandClass(element: any) {
  if (element === this.showMenu) {
      this.showMenu = '0';
  } else {
      this.showMenu = element;
  }
}

toggleCollapsed() {
  this.collapsed = !this.collapsed;
  this.collapsedEvent.emit(this.collapsed);
}

onProfile(){
  this.profile = 1;
  this.notification = 0;
  this.pass = 0;
  this.edit = 0;
  this.delete = 0;
  return;
}

onNotification(){
  this.profile = 0;
  this.notification = 1;
  this.pass = 0;
  this.edit = 0;
  this.delete = 0;
  return;
}

onDelete(){
  this.profile = 0;
  this.notification = 0;
  this.pass = 0;
  this.edit = 0;
  this.delete = 1;
  return;
}

onEdit(){
  this.profile = 0;
  this.notification = 0;
  this.pass = 0;
  this.edit = 1;
  this.delete = 0;
  return;
}

onPass(){
  this.profile = 0;
  this.notification = 0;
  this.pass = 0;
  this.pass = 1;
  this.edit = 0;
  this.delete = 0;
  return;
}

asyncFunc = (...args) => 
            new Promise(r => setTimeout(r , 2500))
            .then(() => {
                this.all = 0;
                this.trigger1 = 0;
                this.trigger2 = 0;
            });

//get rate values
getRates(){
  let sum = 0
  console.log(1);
  this._user.getRate(this.currentUserId).subscribe(
      res=>{
          this.rates = res;
          console.log('dssdf',res);
          for (let i in this.rates){
              sum += this.rates[i].rate;
              console.log(this.rates[i].rate);
          }
          console.log(sum);

          this.averageRate=sum/this.rates.length;
          this.averageRate = 3;
          console.log(this.rates);
      },
      error=>console.log(error)
  )
}

}
