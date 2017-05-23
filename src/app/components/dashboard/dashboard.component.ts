import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	ckeditorContent: string;
	supportedLanguages;

	constructor(
	 private _router: Router,
	 private _authService: AuthService
	 ) { }

	ngOnInit() {
	}

	onChange($event){
		console.log(this.supportedLanguages);
	}
}
