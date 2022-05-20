import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm = new FormGroup({
    photo: new FormControl('',),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
    password: new FormControl('', Validators.required)
  })
  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
  }
  get photo() {
    return this.signupForm.get("photo")
  }

  get name() {
    return this.signupForm.get("name")
  }

  get email() {
    return this.signupForm.get("email")
  }
  get phone() {
    return this.signupForm.get("phone")
  }

  get password() {
    return this.signupForm.get("password")
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  onSubmit() {

    let signupCredentials = {
      photo: this.photo?.value === "" ? "string" : this.photo?.value,
      userFullName: this.name?.value,
      email: this.email?.value,
      phoneNumber: this.phone?.value,
      password: this.password?.value
    }
    console.log(signupCredentials);
    this.spinner.show();
    this.authService
      .signup(signupCredentials)
      .subscribe(
        (result) => {
          console.log(result.Data);
          if (result.Data) {
            let loginCredentials = {
              phoneNumber: result.Data.phoneNumber,
              password: this.password?.value
            }
            const tokenInfo = this.getDecodedAccessToken(result.Data.token); // decode token
            console.log(tokenInfo);
            this.authService.login(loginCredentials).subscribe(
              () => {
                this.signupForm.reset();
                this.authService.setSession(result.Data, tokenInfo)
                this.spinner.hide();
                this.router.navigate(['home'])
              }
            );
          }
        },
        err => {
          this.spinner.hide();
          alert("There was a problem signing up ")
        }
      );
  }

}
