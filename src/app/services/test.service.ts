import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TestService {

	//private testBaseUri = "https://guarded-crag-26034.herokuapp.com/tests/";
	private testBaseUri = "http://0de7dc58.ngrok.io/tests/";
	private addTestUri = this.testBaseUri + "register";

	constructor(private http: Http) { }

	addTest(test){
		return this.http.post(this.addTestUri, test)
							.map(res => res.json());
	}

	getAllTests(){
		return this.http
						.get(this.testBaseUri)
						.map(response => response.json());
	}

	getTestById(id){
		const uri = this.testBaseUri + id;
		return this.http
						.get(uri)
						.map(response => response.json());
	}
}
