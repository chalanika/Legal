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
//get ongoing cases of lawyer
  getOngoingCases(lawyerId){
    return this.http.get(this.baseUrl+'/ongoing/cases/'+lawyerId);
  }
//get ongoing cases of client
getOngoingClientCases(clientId){
  return this.http.get(this.baseUrl+'/ongoing/cases/client/'+clientId);
}
//edit is_closed to true after finished case
  editCase(caseId,newCase:Case){
    return this.http.put(this.baseUrl+'/'+caseId,newCase);
  }
  //get closed case of lawyer
  getClosedCases(lawyerId){
    return this.http.get(this.baseUrl+'/closed/cases/'+lawyerId);
  }
//get closed case of client
getClosedClientCases(clientId){
  return this.http.get(this.baseUrl+'/closed/cases/client/'+clientId);
}
  //get specific case
  getCase(caseId){
    return this.http.get(this.baseUrl+'/id/'+caseId);
  }

  //get specific client's case details
  getClientCase(clientId){
    return this.http.get(this.baseUrl+'/client/'+clientId);
  }

  //update is_rated to true
  updateClientRate(caseId,caseModel:Case){
    return this.http.patch(this.baseUrl+'/update/rate/'+caseId,caseModel);
  }

  //display ongoing cases belongs to client for lawyer
  getlawyerClientOngoingCases(lawyerId,clientId){
    console.log(clientId);
    return this.http.get(this.baseUrl+'/ongoing/lawyer/'+lawyerId+'/client/'+clientId);
  }

   //display closed cases belongs to client for lawyer
   getlawyerClientClosedCases(lawyerId,clientId){
    console.log(clientId);
    return this.http.get(this.baseUrl+'/closed/lawyer/'+lawyerId+'/client/'+clientId);
  }

}
