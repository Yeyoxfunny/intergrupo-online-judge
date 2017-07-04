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
    this.authService.authenticateUser().then(response => {
      if (!response.success) {
        Materialize.toast(response.msg);
        return;
      }

      this.authService.storeUserData(response.token, response.user);
      this.router.navigate(['app']);
    });
  }

  onLogout() {
    this.router.navigate(['']);
  }
}
