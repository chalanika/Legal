import { Injectable } from '@angular/core';
import {Rate} from '../models/Rate';
import {HttpClient} from '@angular/common/http';                                

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  
  //check case files is closed
  isFinished(cid){
    console.log('ddd',cid);
    return this.http.get(this.baseUrl+'/case/'+cid);
  }
}
