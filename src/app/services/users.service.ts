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

	getById(id: string){
		const url = AppSettings.userUrl + id;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		console.log("URL: "+url);
		return this.http.get(url)
					.map(this.extractData)
					.map(this.extractUser)
					.catch(this.handleError);
		//return this.http.get(url).map(res => res.json());
	}

	private extractData = (response: Response) => {
		if(response.status !== 200){
			throw response;
		}
		//console.log(response.json());
		return response.json();
	}

	private extractUser = (responseData): User => {
		return this.convertToUser(responseData);
	}

	private convertToUser = (data): User => {
		let user: User = new UserBuilder()
									.setId(data._id)
									.setName(data.name)
									.setUserName(data.username)
									.setEmail(data.email)
									.setImageUrl(data.imageUrl)
									.build();

		return user;
	}

	private handleError(error: Response | any){
		let errMsg: string;
		if(error instanceof Response){
			const body = error.json() || '';
			const err = body.msg || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else{
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
