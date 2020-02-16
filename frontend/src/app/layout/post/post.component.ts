import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from 'src/app/user.service';
import { FormGroup , FormControl , Validators  } from '@angular/forms';
import { PostService } from '../../../app/core/services/post.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [routerTransition()]
})
export class PostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
  });

  updateForm: FormGroup = new FormGroup({
    name: new FormControl(true),
    email: new FormControl(true),
    title: new FormControl(true),
    description: new FormControl(true),
  });


  

  CurrentUser;
  type;
  id;
  posts;
  postid;
  details;
  postf=1;
  editf=0;
  typef=0;
  constructor(private _post: PostService, public _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.user().subscribe(
      res => {
        this.CurrentUser = res;
        this.id = this.CurrentUser._id;
        this.type = this.CurrentUser.type;
        console.log(this.type);
        if (this.type != 'Client') {
          this.loadPosts();
          this.typef = 1 ;
        }
       if (this.type  == 'Client') {
         this.typef = 0;
          this.loadClientposts();        
        }
      }, err => {
        console.log(err);
      }
    );
  }

  post() {
    this.postf = 1;
    this.editf = 0;
    this.loadPosts();
    this._post.post(this.postForm.value, this.id).subscribe(
      data => {console.log(data); this._router.navigate(['/post']); },
      err => {console.log(err); }
    );
  }
  Delete(pid) {
    console.log('You are here to delete');
    console.log(pid);
    this._post.deletepost(pid).subscribe(
      data => { console.log(data); },
      err => {console.log(err); }
    );
    this.loadPosts();
  }
  update(pid){
    console.log('You are here to update the post');
    console.log(pid);
    console.log(this.updateForm.value);
    if(this.updateForm.controls.name.value==true){
      this.updateForm.controls['name'].setValue(this.details.name); 
    }
    if(this.updateForm.controls.email.value==true){
      this.updateForm.controls['email'].setValue(this.details.email); 
    }
    if(this.updateForm.controls.title.value==true){
      this.updateForm.controls['title'].setValue(this.details.title); 
    }
    if(this.updateForm.controls.description.value==true){
      this.updateForm.controls['description'].setValue(this.details.description); 
    }
    console.log(this.updateForm.value);
    this._post.postupdate(this.updateForm.value , pid).subscribe(
      data => { console.log(data); 
                this.loadPosts();},
      err => {console.log(err); }
    );

  }

  Edit(pid) {
    this.postf = 0;
    this.editf = 1;
    console.log('You are here to edit');
    this._post.updatepost(pid).subscribe(
      res => {
        this.postid = res;
        console.log(this.postid[0].name);
        this.details = this.postid[0];
        console.log(this.details);
      },
      err => {
        console.log(err);
      });
      // this.Delete(pid);
  }

  loadPosts() {
    console.log(this.id);
    this._post.Postedposts(this.id).subscribe(
      res => {
        console.log(res);
        this.posts = res;
      }, err => {
        console.log(err);
      }
    );
  }
  loadClientposts(){
    console.log(this.id);
    this._post.clientposts().subscribe(
      res =>{
        console.log(res);
        this.posts = res;
      }, err => {
        console.log(err);
      }
    );
  }

}
