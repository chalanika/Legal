import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAppointmentNotification(lawyerId) {
    console.log(lawyerId);
    return this.http.get(this.baseUrl + '/notification/appointments/' + lawyerId);
  }
}
