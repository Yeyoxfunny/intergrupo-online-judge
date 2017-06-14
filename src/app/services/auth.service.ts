import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { User, UserBuilder } from '../model/user';
import { AppSettings } from '../app.settings';


@Injectable()
export class AuthService {
  
  public authToken: any;
  public user: any;
  private session;

  private userBaseUrl = "http://localhost:3000/";
  private authUserUrl = AppSettings.authUrl + "authenticate";
  //private userInfoUrl = this.authUserUrl + 'profiles';

  constructor(private http: Http) {
      
   }
  
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.authUserUrl, user, {headers: headers})
                    .map(res => res.json());
  }

  getAllUsers(){
    return this.http.get(this.userBaseUrl).map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getStoredUserData(): User{
    let storedUser = JSON.parse(localStorage.getItem('user'));
    return this.convertToUser(storedUser);
  }

  convertToUser(storedUser): User{
    let user: User = new UserBuilder()
                            .setId(storedUser.id)
                            .setName(storedUser.name)
                            .setUserName(storedUser.username)
                            .setEmail(storedUser.email)
                            .build();
    return user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired();
  }
}
