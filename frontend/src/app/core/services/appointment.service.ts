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
  getLawyersConfirmedAppointments(lawyerId){
    console.log(lawyerId);
    return this.http.get(this.baseUrl+'/confirmed/lawyers/'+lawyerId);
  }
  getLawyersIncomingAppointments(lawyerId){
    console.log(lawyerId);
    return this.http.get(this.baseUrl+'/incoming/lawyers/'+lawyerId);
  }
  getClientsConfirmedAppointments(clientId){
    console.log(clientId);
    return this.http.get(this.baseUrl+'/confirmed/clients/'+clientId);
  }
  getClientsRejectedAppointments(clientId){
    console.log(clientId);
    return this.http.get(this.baseUrl+'/rejected/clients/'+clientId);
  }
  getAppointment(id:string){
    return this.http.get(this.baseUrl+'/'+id);
  }
  editAppointment(id,appointment:Appointment){
    return this.http.put(this.baseUrl+'/'+id,appointment);
  }
  deleteAppointment(id){
    return this.http.delete(this.baseUrl+'/'+id);
  }
}
