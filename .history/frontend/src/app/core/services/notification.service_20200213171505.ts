import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl = 'http://localhost:3000/appointment';

  constructor(private http:HttpClient) { }

  getAppointmentNotification(appointment:Appointment){
    console.log(appointment);
    return this.http.get(this.baseUrl);
  }
}
