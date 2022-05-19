import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../Models/Login';
import { Register } from '../Models/Register';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loginData: Object = {};
  tokenInfo: Object = {};

  private loginApiUrl = 'https://bank.atc-servers.com/api/Auth/login';
  private signupApiUrl = 'https://bank.atc-servers.com/api/Auth/register';

  constructor(private http: HttpClient) { }

  login(loginCredentials: Login): Observable<any> {
    return this.http.post(this.loginApiUrl, loginCredentials, httpOptions);
  }

  saveLoginInfo(loginData: object, tokenInfo: object) {
    this.loginData = loginData;
    this.tokenInfo = tokenInfo
  }

  getLoginInfo() {
    return this.loginData;
  }

  getTokenInfo() {
    return this.tokenInfo;
  }

  signup(signupCredentials: Register): Observable<any> {
    return this.http.post(this.signupApiUrl, signupCredentials, httpOptions);
  }

  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.apiUrl);
  // }

  // deleteTask(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.delete<Task>(url);
  // }

  // updateTaskReminder(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.put<Task>(url, task, httpOptions);
  // }

  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(this.apiUrl, task, httpOptions);
  // }
}
