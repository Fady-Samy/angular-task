import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from "../../Models/Login"
import { AuthService } from '../../services/auth.service';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('', Validators.required)
  })

  // bootstrap toast variables
  showToast: boolean = false;
  toastTitle: string;
  toastMessage: string;
  toastClass: string;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  get phone() {
    return this.loginForm.get("phone")
  }

  get password() {
    return this.loginForm.get("password")
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  //Setting toast variables
  setToast(title: string, msg: string, className: string) {
    this.showToast = true;
    this.toastTitle = title;
    this.toastMessage = msg
    this.toastClass = className
  }

  hideToast() {
    setTimeout(() => {
      this.showToast = false
    }, 3000);
  }

  onSubmit() {
    let loginCredentials = {
      phoneNumber: this.phone?.value,
      password: this.password?.value
    }
    this.spinner.show();
    this.authService
      .login(loginCredentials)
      .subscribe(
        (result) => {
          this.loginForm.reset();
          console.log(result.Data);
          const tokenInfo = this.getDecodedAccessToken(result.Data.token); // decode token
          // console.log(tokenInfo);
          this.authService.setSession(result.Data, tokenInfo)
          this.spinner.hide();
          this.router.navigate(['home'])
        },
        err => {
          this.spinner.hide();
          this.setToast("Error", "Error login, Check Your Credentials", "bg-danger")
          this.hideToast()
        }
      );
  }

}
