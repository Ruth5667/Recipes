import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  // public lang: BehaviorSubject<string> = new BehaviorSubject<string>('en')

  constructor(private _http: HttpClient) {
  }
  login(user: User) :Observable<User>{
    return this._http.post<User>(`https://localhost:7093/api/User/login`,user)
  }
  register(user: User):Observable<User>{
    return this._http.post<User>(`https://localhost:7093/api/User`,user)
  }
  // getUsers(): Observable<User[]>{
  //   return this._http.get<User[]>('https://localhost:7093/api/User')
  // }
  // getUserById(id: number): Observable<User> {
  //   return this._http.get<User>(`https://localhost:7093/api/User/${id}`)
  // }
  // addUser(user: User) {
  //   return this._http.post('https://localhost:7093/api/User', user)
  //   // this.productsList.push(product)
  // }
  // changeLang(lang: string) {
  //   this.lang.next(lang)
  // }
}
