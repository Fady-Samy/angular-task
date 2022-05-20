import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../Models/Login';
import { Register } from '../Models/Register';
import * as moment from "moment";


let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginApiUrl = 'https://bank.atc-servers.com/api/Auth/login';
  private signupApiUrl = 'https://bank.atc-servers.com/api/Auth/register';

  constructor(private http: HttpClient) { }

  login(loginCredentials: Login): Observable<any> {
    return this.http.post(this.loginApiUrl, loginCredentials, httpOptions);
  }

  signup(signupCredentials: Register): Observable<any> {
    return this.http.post(this.signupApiUrl, signupCredentials, httpOptions);
  }

  setSession(loginInfo: any, tokenInfo: any) {
    const expiresAt = moment().add(tokenInfo.exp, 'second');

    localStorage.setItem('id_token', loginInfo.token);
    localStorage.setItem('user_name', loginInfo.userFullName);
    localStorage.setItem('user_role', tokenInfo.role);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }


  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  isUserAdmin() {
    const userRole = localStorage.getItem("user_role");
    if (userRole?.toLowerCase() === "admin") {
      return true;
    } else {
      return false;
    }

  }

  getUserName() {
    const userName = localStorage.getItem("user_name");
    return userName;
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
