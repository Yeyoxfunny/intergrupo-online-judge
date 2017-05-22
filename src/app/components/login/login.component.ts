import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: String;
  password: String;
  auth: String;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService) { }

  ngOnInit() {

  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this._authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this._authService.storeUserData(data.token, data.user);
        this._flashMessage.show('Has iniciado Sesion Correctamente', {
          cssClass: 'alert alert-dismissible alert-success',
          timeout: 5000
        });
        this._router.navigate(['dashboard']);
      } else {
        this._flashMessage.show(data.msg, {
          cssClass: 'alert alert-dismissible alert-danger',
          timeout: 5000
        });
        this.auth = 'isFalse'
        this._router.navigate(['']);
      }
    });
  }

  onLogout() {
    this._router.navigate(['']);
  }


}
