import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Challenge, ChallengeBuilder } from '../model/challenge';
import { Language } from '../model/language';

import { AppSettings } from '../app.settings';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';

@Injectable()
export class ChallengeService {
	private addTestUrl = AppSettings.apiEndPoint + "register";

	constructor(private http: Http, private authService: AuthService) { }

	add(challenge: Challenge){
		let body = {
			title: challenge.title,
			exampleHtml: challenge.descriptionHTML,
			language: challenge.languages,
			difficulty: challenge.difficulty
		};

		return this.http.post(AppSettings.challengeUrl, body)
							.map(this.extractData)
							.catch(this.handleError);
	}
  update(id, challenge: Challenge){
    let body = {
			title: challenge.title,
			exampleHtml: challenge.descriptionHTML,
			language: challenge.languages,
			difficulty: challenge.difficulty
		};

    return this.http.put(AppSettings.challengeUrl+id, body)
							.map(this.extractData)
							.catch(this.handleError);
  }

	getAll(): Observable<Challenge[]>{
		return this.http
						.get(AppSettings.challengeUrl)
						.map(this.extractData)
						.map(this.extractChallenges)
						.catch(this.handleError);
	}

	getById(id: string): Observable<Challenge>{
		const uri = AppSettings.challengeUrl + id;
		return this.http
						.get(uri)
						.map(this.extractData)
						.map(this.extractChallenge)
						.catch(this.handleError);
	}

	private extractData(response: Response){
		if(response.status !== 200){
			throw response;
		}
		return response.json();
	}
	private extractChallenges = (responseData): Challenge[] => {
		let challenge: Challenge[] = responseData.tests.map(this.convertToChallenge);
		return challenge;
	}

	private extractChallenge = (responseData): Challenge => {
		return this.convertToChallenge(responseData.test);
	}

	private convertToChallenge = (data): Challenge => {
		let languages: Language[] = data.language.map(x => new Language(x.name, x.sourceCodeUrl));
		let challenge: Challenge = new ChallengeBuilder()
							.setId(data._id)
							.setTitle(data.title)
							.setDescriptionHTML(JSON.parse(data.exampleHtml))
							.setLanguages(languages)
							.setDifficulty(data.difficulty)
							.build();
		return challenge;
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
		console.log(error);
		return Observable.throw(errMsg);
	}
}
