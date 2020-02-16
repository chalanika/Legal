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

  share(body:any){
    return this._http.post('http://127.0.0.1:3000/users/share',body);
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

  getLawyers(){
    return this._http.get('http://127.0.0.1:3000/users/getLawyers',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  getConnect(objId:any){
    console.log(objId);
    return this._http.get('http://127.0.0.1:3000/users/getConnect/'+objId,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  getConnect2(objId:any){
    console.log(objId);
    return this._http.get('http://127.0.0.1:3000/users/getConnect2/'+objId,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  rev(theNic){
    return this._http.get('http://127.0.0.1:3000/users/files/'+theNic);
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

  updatePassword(body:any){
    return this._http.post('http://127.0.0.1:3000/users/updatePassword',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  updateMe(body:any){
    return this._http.patch('http://127.0.0.1:3000/users/updateMe',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  deleteMe(){
    return this._http.delete('http://127.0.0.1:3000/users/deleteMe' , {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }

  deleteUser(info){
    return this._http.delete('http://127.0.0.1:3000/users/deleteUser/'+info , {
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
  //get specific client details
<<<<<<< HEAD
=======
  getClient(id){
    return this._http.get('http://127.0.0.1:3000/users/client/'+id);
  }

>>>>>>> 799a38112a6ab443a9cdc222c16509dbac0a2934
  getClient(id){
    return this._http.get('http://127.0.0.1:3000/users/client/'+id);
  }

}
