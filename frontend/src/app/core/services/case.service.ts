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
    console.log(caseModel);
    return this.http.post(this.baseUrl,caseModel);
  }
}
