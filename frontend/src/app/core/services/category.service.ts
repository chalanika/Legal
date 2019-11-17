import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://localhost:3000/category';

  constructor(private http:HttpClient) { }

  createCategory(category: Category){
    return this.http.post(this.baseUrl,category);
  }

  getCategories(){
    return this.http.get(this.baseUrl);
  }

  getCategory(id){
    return this.http.get(this.baseUrl+'/'+id);
  }

  editCategory(id,category){
    return this.http.put(this.baseUrl+'/'+id,category);
  }

  deleteCategory(id){
    return this.http.delete(this.baseUrl+'/'+id);
  }

}
