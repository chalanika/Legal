import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Case } from '../models/case';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  baseUrl = 'http://localhost:3000/case';

  constructor(private http:HttpClient) { }

  createCase(caseModel:Case){
    return this.http.post(this.baseUrl,caseModel);
  }
//get all clients that has cases for specific lawyer
  getClients(lawyerId){
    return this.http.get(this.baseUrl +'/clients/'+ lawyerId);
  }

  getOngoingCases(lawyerId){
    return this.http.get(this.baseUrl+'/ongoing/cases/'+lawyerId);
  }
//edit is_closed to true after finished case
  editCase(caseId,newCase:Case){
    return this.http.patch(this.baseUrl+'/'+caseId,newCase);
  }

  getClosedCases(lawyerId){
    return this.http.get(this.baseUrl+'/closed/cases/'+lawyerId);
  }

}
