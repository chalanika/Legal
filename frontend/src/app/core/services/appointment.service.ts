import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Appointment } from '../models/appointment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl = 'http://localhost:3000/appointment';

  constructor(private http:HttpClient) { }

  createAppointment(appointment:Appointment){
    console.log(appointment);
    return this.http.post(this.baseUrl,appointment);
  }

  getAppointment(id:string){
    return this.http.get(this.baseUrl+id);
  }

}
