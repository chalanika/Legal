import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAppointmentNotification(LawyerId) {
    console.log(LawyerId);
    return this.http.get(this.baseUrl + '/notification/appointments/' + LawyerId);
  }
  getClientApointments(UserId){
    console.log(UserId);
    return this.http.get(this.baseUrl + '/notification/clientAppointment/' + UserId);
  }
}
