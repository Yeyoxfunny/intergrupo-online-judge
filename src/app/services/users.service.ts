import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User, UserBuilder } from '../model/user';
import { AppSettings } from '../app.settings';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class UsersService {

	constructor(private http: Http) { }

	getById(id: string): Observable<User> {
		const url = AppSettings.userUrl + id;

		return this.http.get(url)
			.map(this.extractData)
			.map(this.extractUser)
			.catch(this.handleError);
	}

	update(id: string, user: User): Observable<User>{
		const url = AppSettings.userUrl + id;

		return this.http.put(url, user)
				.map(this.extractData)
				.catch(this.handleError);
	}

  updateImage(id: any, user: any){
    console.log(user.imageUrl);
    const url = AppSettings.userUrl;
    return this.http.put(`${url}updateImage/${id}`, {imageUrl: user.imageUrl})
    .map(this.extractData)
    .catch(this.handleError);
  }

	private extractData = (response) => {
		if (response.status !== 200) {
			throw response;
		}
		return response.json();
	}

	private extractUser = (responseData): User => {
		return this.convertToUser(responseData.user);
	}

	private convertToUser = (data): User => {
		let user: User = new UserBuilder()
			.setId(data._id)
			.setName(data.name)
      .setSurname(data.surname)
			.setUserName(data.username)
			.setEmail(data.email)
			.setImageUrl(data.imageUrl)
      .setJobTitle(data.jobTitle)
			.build();

		return user;
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.msg || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
