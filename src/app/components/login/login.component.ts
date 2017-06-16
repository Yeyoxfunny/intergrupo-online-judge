import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as Materialize from 'angular2-materialize';

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
      this.router.navigate(['/app']);
    }
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (!data.success) {
        console.log(data);
        this.flashMessage.show(data.msg, { cssClass: 'alert-error', timeout: 5000});
        return;
      }
      
      this.authService.storeUserData(data.token, data.user);
      this.router.navigate(['app']);
    });
  }

  onLogout() {
    this.router.navigate(['']);
  }
}
