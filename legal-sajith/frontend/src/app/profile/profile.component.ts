import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    username:'';
    email:'';
    nic:'';
    image:'';
    detail: '';
    address;
    number;
    area;
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

    @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(private translate: TranslateService, public router: Router , private _user:UserService , private _router:Router) {
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
    this.area = data.area;  
    console.log(data.image);
    var path = data.image.replace(/\\/g, '/');
    path = path.replace(/public/g, '');
    console.log(path);
    if(data.image != null)
    this.imageUrl = 'http://localhost:3000/' + path;  //' http://localhost:3000/images' + path;
    console.log(this.imageUrl);
    // console.log('/images/' + path);
    // this.image = "/images/" + path;
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

}
