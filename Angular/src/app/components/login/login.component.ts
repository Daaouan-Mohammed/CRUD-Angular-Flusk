import { AppUser } from '../../module/user.model';
import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SigneUpComponent } from '../signe-up/signe-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm: FormGroup;
  errorMsg: any;
  hide = true;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DialogRef<LoginComponent>,
    private _router: Router,
    private _login: LoginService,
    private _SigneUp: MatDialog,
  ) {
    this.LoginForm = this._fb.group({
      username: this._fb.control(""),
      password: this._fb.control(""),
    })
  }

  OnFormLogin() {
    let username = this.LoginForm.value.username;
    let password = this.LoginForm.value.password;
    this._login.login(username, password).subscribe({
      next: (AppUser) => {
        this._login.authenticateUser(AppUser).subscribe({
          next: (data: boolean) => {
            this._dialogRef.close();
            this._router.navigateByUrl("./home");
          }
        });
      },
      error: (err) => {
        this.errorMsg = err;
      }
    });
  }

  openSigneUpForm() {
    this._SigneUp.open(SigneUpComponent, { width: '500px', disableClose: false });
  }

}
