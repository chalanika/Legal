import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/user.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../file.service';
import {saveAs} from 'file-saver';

const uri = 'http://localhost:3000/file/upload'; // in original app use 4200
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers:[FileService]
})
export class FileComponent implements OnInit {

    username:'';
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;

    @Output() collapsedEvent = new EventEmitter<boolean>();

  uploader:FileUploader = new FileUploader({url:uri});

  attachmentList:any = [];

  constructor(private _fileService:FileService , private translate: TranslateService, public router: Router , private _user:UserService , private _router:Router) { 


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

    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
     }
  }

  addName(data){
    this.username = data.username;
}

  download(index){
    var filename = this.attachmentList[index].uploadname;

    this._fileService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
}


  ngOnInit() {
    this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
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

changeLang(language: string) {
    this.translate.use(language);
}

onLoggedout() {
    localStorage.removeItem('isLoggedin');
}

}
