import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/Rx';
// import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http:HttpClient) { }

  downloadFile(file:String,theNic:String){
    var body = {filename:file,nic:theNic};

    return this._http.post('http://localhost:3000/file/download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  downloadShFile(nic,shFile){
    var body = {filename:shFile,nic:nic};
    return this._http.post('http://localhost:3000/file/downloadSh',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteShFile(nic,shFile){
    var body = {filename:shFile,nic:nic};
    return this._http.delete('http://127.0.0.1:3000/file/deleteSh/'+nic+'/'+shFile , {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type' , 'application/json')
    });
  }
}

