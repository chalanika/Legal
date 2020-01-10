import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user : any) {
    if(user.username == undefined || user.nic == undefined || user.email == undefined || user.password == undefined || user.cpass == undefined){
      return false;
    } else{
      return true;
    }
  }

  validateEmail(email){
    return Validators.email;
  }

}
