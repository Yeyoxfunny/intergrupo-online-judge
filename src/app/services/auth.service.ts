import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  
  public authToken: any;
  public user: any;
  private session;

  private userBaseUri = "https://guarded-crag-26034.herokuapp.com/users/";
  private authUserUri = this.userBaseUri + 'authenticate';

  constructor(private http: Http) {
      
   }
  
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.authUserUri, user, {headers: headers})
                    .map(res => res.json());
  }

  getAllUsers(){
    return this.http.get('http://localhost:3000/users/profiles').map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getStoredUserData(){
    return JSON.parse(localStorage.getItem('user'));
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
