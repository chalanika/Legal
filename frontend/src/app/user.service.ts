import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Rate } from './core/models/Rate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/users/register',body);
  }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  user(){
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  resetPassword(body:any){
    return this._http.post('http://127.0.0.1:3000/users/forgotPassword',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  // sendToken(){
  //   return this._http.patch('http://127.0.0.1:3000/users/resetPassword/:token',{
  //     observe:'body',
  //     withCredentials:true,
  //     headers:new HttpHeaders().append('Content-Type' , 'application/json')
  //   });
  // }

  //get all lawyers details
  viewLawyers(){
    console.log("xxxxxxxxx");
    return this._http.get('http://127.0.0.1:3000/users/lawyers');
  }
  //get categorized lawyers
  categorizedLawyers(category: String){
    return this._http.get('http://127.0.0.1:3000/users/lawyers/'+category);
  }

  //get specific lawyer details 
  getLawyer(id:String){
    // console.log(id);
    return this._http.get('http://127.0.0.1:3000/users/lawyer/'+id);
  }

  // send rating form to server
  rate(id:String,rate:Rate){
    console.log(rate);
    return this._http.put('http://127.0.0.1:3000/users/'+id+'/rates',rate);
  }

  getRate(id){
    console.log(id);
    return this._http.get('http://127.0.0.1:3000/users/rate/'+id);
  }

}
