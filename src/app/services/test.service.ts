import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Test } from '../model/test';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestService {

	//private testBaseUri = "https://guarded-crag-26034.herokuapp.com/tests/";
	private testBaseUrl = "http://0de7dc58.ngrok.io/tests/";
	private addTestUrl = this.testBaseUrl + "register";

	constructor(private http: Http) { }

	addTest(test){
		return this.http.post(this.addTestUrl, test)
							.map(res => res.json());
	}

	getAllTests(): Promise<any>{
		return this.http
						.get(this.testBaseUrl)
						.toPromise()
						.then(this.extractData)
						.then(this.extractTests)
						.catch(this.handleError);
	}

	getTestById(id){
		const uri = this.testBaseUrl + id;
		return this.http
						.get(uri)
						.toPromise()
						.then(this.extractData)
						.then(this.extractTest)
						.catch(this.handleError);
	}

	private extractData(response: Response){
		if(response.status !== 200){
			throw response;
		}
		return response.json();
	}
	private extractTests(responseData): Test[]{
		let tests: Test[];
		responseData.tests.forEach(data => {
			tests.push(this.convertToTest(data));
		});
		return tests;
	}

	private extractTest(responseData): Test{
		return this.convertToTest(responseData);
	}

	private convertToTest(data): Test{
		return new Test(data.title, JSON.parse(data.exampleHtml), 
							data.language, data.sourceCodeUrl, 
							data.dificulty);
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
		return Promise.reject(errMsg);
	}
}
