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
        if(this.type != 'Client') {
          this.loadPosts(); 
          this.typef=1;

        };
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

  Edit(pid) {
    this.postf = 0;
    this.editf = 1;
    console.log('You are here to edit');
    this._post.updatepost(pid).subscribe(
      res => {
        this.postid = res;
        console.log(this.postid[0].name);
        this.details = this.postid[0];
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

}
