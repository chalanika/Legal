import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http:HttpClient) { }

  post(body:any){
    return this._http.post('http://127.0.0.1:3000/postlawyer/postcreation',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }
}
