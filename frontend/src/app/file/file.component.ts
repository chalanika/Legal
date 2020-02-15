import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/user.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../file.service';
import { saveAs } from 'file-saver';
import { FormGroup , FormControl , Validators  } from '@angular/forms';
// import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';


const uri = 'http://localhost:3000/file/upload';
// @Injectable({
//     providedIn: 'root'
//   })
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers:[FileService]
})
export class FileComponent implements OnInit {

    tasks = [{'id': '1', 'name':'Upload file to your store'}, {'id':'2', 'name': 'Share files with lawyer'} , 
                                                                        {'id':'3', 'name': 'Received Files'}];
    choise;
    types;
    images;
    username:'';
    nic:'';
    type;
    currentUserType;
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    imageFile = null;
    imageUrl: any;
    uploadf = 1;
    sharef = 0;
    revf = 0;
    fileName;
    showMsg: boolean = false;
    receivedFiles:any = [];

    shareForm: FormGroup = new FormGroup({
        image: new FormControl(null),
        lawyer: new FormControl(null)
    } );

    get image() {
        return this.shareForm.get('image');
    }

    get lawyer() {
        return this.shareForm.get('lawyer');
    }

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
            data=>{
                this.addName(data);
                // this.uploader.onBeforeUploadItem = (item: any) => {
                //     this.uploader.options.additionalParameter = {
                //       nic: this.nic,
                //     };
                //   };
                  this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
                    form.append('nic' , this.nic);
                   };
            },
            error=>this._router.navigate(['/login'])
        )

    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
     }

    this._user.getLawyers()
            .subscribe(
                data=>{
                    // console.log(data['All Lawyers'][0]);
                    // data['All Lawyers'].forEach(function (value) {
                    //     console.log(value);
                    //   }); 
                    // {'id': 'Admin', 'name':'Admin'}, {'id':'Lawyer', 'name': 'Lawyer'}, {'id':'Client', 'name': 'Client'}
                    this.types = data['All Lawyers'];
                    console.log(this.types);
                },
                error=>console.log('error')
            )
  }

  addName(data){
    this.username = data.username;
    this.nic = data.nic;
    this.type = data.type;
    this.currentUserType = data.type;
}

  download(index){
    var filename = this.attachmentList[index].uploadname;

    this._fileService.downloadFile(filename,this.nic)
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

  share(){
    let data = new FormData();
    
    data.append('lawyer', this.shareForm.controls.lawyer.value);
    data.append('nic', this.nic);
    data.append('task' , 'share');
    data.append('image', this.imageFile, this.imageFile['name']);

    this._user.share(data).subscribe(
        data => {console.log('Success');this.showMsg= true; this.asyncFunc();},// window.location.reload();
        error => {console.log(error);}
    )
  }

  uploadF(){
      this.uploadf = 1;
      this.sharef = 0;
      this.revf = 0;
      return;
    //   this.asyncFunc();
  }

  shareF(){
    this.sharef = 1;
    this.uploadf = 0;
    this.revf = 0;
    this.showMsg = false;
    // this.asyncFunc();
    return;
}

revF(){
    this.revf = 1;
    this.uploadf = 0;
    this.sharef = 0;

    this._user.rev(this.nic).subscribe(
        data => {console.log(data);this.receivedFiles = data},// window.location.reload();
        error => {console.log(error);}
    )

    return;
  //   this.asyncFunc();
}

asyncFunc = (...args) => 
            new Promise(r => setTimeout(r , 2500))
            .then(() => {
                this.showMsg = false;
                this.fileName = '';
                this.imageFile = ''; // Find how to clear the selected file values from button
            });

  imageUpload(event:any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
        this.imageFile = event.target.files[0];
        this.fileName = this.imageFile.name;
        console.log(this.imageFile);

        reader.onloadend = () => {
            this.imageUrl = reader.result;
          }
          reader.readAsDataURL(this.imageFile);
    }
  }

  callType(value){
    this.choise = value;
    return;
}

  selectImage(event){
      if(event.target.files.length>0){
          const file = event.target.files[0];
          this.images = file;
      }
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
    this._user.logout()
        .subscribe(
            data=>{console.log(data);this._router.navigate(['/login'])},
            error=>console.log(error)
        )
        localStorage.removeItem('isLoggedin');
}

}
