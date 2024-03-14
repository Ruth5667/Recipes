import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private _http: HttpClient) { }
  getCategories(): Observable<Category[]>{
    return this._http.get<Category[]>(`https://localhost:7093/api/Category`)
  }
}
