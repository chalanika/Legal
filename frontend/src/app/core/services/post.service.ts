import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  post(details: any, id: any) {
    const body = {details: details, lawid: id};
    return this._http.post('http://127.0.0.1:3000/postlawyer/postcreation', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }
  // update(pid){
  //   console.log(pid);
  //   return this._http.post('http://127.0.0.1:3000/postlawyer/postupdate' + pid );
  // }
  Postedposts(lawyerId) {
    console.log(lawyerId);
    return this._http.get('http://127.0.0.1:3000/postlawyer/postview/' + lawyerId);

  }

  deletepost(pid) {
    console.log(pid);
    return this._http.delete('http://127.0.0.1:3000/postlawyer/postdelete/' + pid);
  }

  updatepost(pid) {
    console.log(pid);
    return this._http.get('http://127.0.0.1:3000/postlawyer/postupdate/' + pid);
  }
}
