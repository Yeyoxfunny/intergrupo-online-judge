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
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.router.navigate(['/home']);
    }
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Has iniciado Sesion Correctamente', {
          cssClass: 'alert alert-dismissible alert-success',
          timeout: 5000
        });
        this.router.navigate(['home']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert alert-dismissible alert-danger',
          timeout: 5000
        });
        this.auth = 'isFalse'
        this.router.navigate(['']);
      }
    });
  }

  onLogout() {
    this.router.navigate(['']);
  }
}
