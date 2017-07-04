import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class DownloadService {

  constructor(private http: Http) { }
  baseUrl: string = 'http://localhost:3000/files';
  downloadChallenge(sourceCodeUrl) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/zip');
    headers.append('Accept', 'application/zip');

    return this.http.get(`${this.baseUrl}/${sourceCodeUrl}`, { headers: headers })
      .catch(this.handleError);
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
    console.log(error);
    return Observable.throw(errMsg);
  }

}
