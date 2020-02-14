import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
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
    email:new FormControl(null),
    description: new FormControl(null)
  });
  constructor(private _post:PostService) { }

  ngOnInit() {
  }

  post(){
    console.log("Hello");
    console.log(this.postForm.controls.name.value);
    this._post.post(JSON.stringify(this.postForm.value)).subscribe(
      data => {console.log(data)},
      err => {console.log(err)}
    )
  }

}
