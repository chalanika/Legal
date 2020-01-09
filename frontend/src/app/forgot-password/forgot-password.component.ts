import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators  } from '@angular/forms';
import { UserService } from '../user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.email, Validators.required]),
} );

get email() {
  return this.resetPasswordForm.get('email');
}

  constructor(private _router:Router , private _userService:UserService) { }

  ngOnInit() {
  }

  sendResetRequest() {
    this._userService.resetPassword(JSON.stringify(this.resetPasswordForm.value))
        .subscribe(
            data => {console.log(data); this._router.navigate(['/login']);},
            error => {
                console.error(error);
                return;
            }
        );
  }

}
