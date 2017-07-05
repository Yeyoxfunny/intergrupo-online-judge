import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate() {
    if (this.authService.getStoredUserData().isAdmin) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
