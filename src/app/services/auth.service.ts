import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';

/* External Library */
import * as kurve from 'kurvejs';

/* Models */
import { User, UserBuilder } from '../model/user';

/* Settings */
import { AppSettings } from '../app.settings';


@Injectable()
export class AuthService {

  public authToken: any;
  public user: any;
  private session;

  private authUserUrl = AppSettings.authUrl + 'authenticate';
  private kurveId = new kurve.Identity(AppSettings.clientID, AppSettings.tokenProcessorUrl,
                                  { endpointVersion: kurve.EndpointVersion.v1 });

  constructor(private http: Http) {

  }

  authenticateUser(): Promise<any> {
    return this.kurveId.loginAsync().then(_ => {
      const graph = new kurve.Graph(this.kurveId);
      return graph.me.GetUser().then(profileData => {
        const user = {
          name: profileData.givenName,
          surname: profileData.surname,
          email: profileData.mail,
          jobTitle: profileData.jobTitle
        };

        return this.http.post(AppSettings.authUrl, user).toPromise();
      });
    })
    .then(this.checkStatus);;
  }

  private checkStatus(response: Response | any) {
    if (response.status !==  200) {
      throw response;
    }

    return response.json();
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getStoredUserData(): User{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return this.convertToUser(storedUser);
  }

  convertToUser(storedUser): User{
    const user: User = new UserBuilder()
                            .setId(storedUser.id)
                            .setName(storedUser.name)
                            .setSurname(storedUser.surname)
                            .setUserName(storedUser.username)
                            .setEmail(storedUser.email)
                            .setJobTitle(storedUser.jobTitle)
                            .setImageUrl(storedUser.imageUrl)
                            .setIsAdmin(storedUser.isAdmin)
                            .build();
    return user;
  }

  updateStoreUserData(user: User){
    let storeUser = JSON.parse(localStorage.getItem('user'));
    storeUser.id = user.id;
    storeUser.name = user.name;
    storeUser.username = user.username;
    storeUser.email = user.email;
    storeUser.imageUrl = user.imageUrl;

    localStorage.setItem('user', JSON.stringify(storeUser));
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.kurveId.logOut();
  }

  loggedIn(){
    return tokenNotExpired();
  }
}
