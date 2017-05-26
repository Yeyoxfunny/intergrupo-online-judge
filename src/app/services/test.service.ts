import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Test, TestBuilder } from '../model/test';
import { Language } from '../model/language';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestService {

	private testBaseUrl = "http://18b5afa3.ngrok.io/";
	private addTestUrl = this.testBaseUrl + "register";

	constructor(private http: Http) { }

	addTest(test: Test){
		let body = {
			title: test.title,
			exampleHtml: test.descriptionHTML,
			language: JSON.stringify(test.languages),
			dificulty: test.difficulty 
		};

		return this.http.post(this.addTestUrl, body)
							.map(this.extractData)
							.catch(this.handleError);
	}

	getAllTests(): Observable<Test[]>{
		return this.http
						.get(this.testBaseUrl)
						.map(this.extractData)
						.map(this.extractTests)
						.catch(this.handleError);
	}

	getTestById(id: string): Observable<Test>{
		const uri = this.testBaseUrl + id;
		return this.http
						.get(uri)
						.map(this.extractData)
						.map(this.extractTest)
						.catch(this.handleError);
	}

	private extractData(response: Response){
		if(response.status !== 200){
			throw response;
		}
		return response.json();
	}
	private extractTests = (responseData): Test[] => {
		let tests: Test[] = responseData.tests.map(this.convertToTest);
		return tests;
	}

	private extractTest = (responseData): Test => {
		return this.convertToTest(responseData.test);
	}

	private convertToTest = (data): Test => {
		let languages: Language[] = data.language.map(x => new Language(x.name, x.sourceCodeUrl));
		let test: Test = new TestBuilder()
							.setId(data._id)
							.setTitle(data.title)
							.setDescriptionHTML(JSON.parse(data.exampleHtml))
							.setLanguages(languages)
							.setDifficulty(data.dificulty)
							.build();
		return test;
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
