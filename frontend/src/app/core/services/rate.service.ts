import { Injectable } from '@angular/core';
import {Rate} from '../models/Rate';
import {HttpClient} from '@angular/common/http';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  rate(id:String,rate:Rate){
    console.log(rate);
    return this.http.put(this.baseUrl+'/'+id+'/rates',rate);
  }
}
