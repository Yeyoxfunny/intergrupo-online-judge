import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test.service';
import { FlashMessagesService } from 'angular2-flash-messages';

/* Models */
import { Test, TestBuilder } from '../../model/test';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

	constructor(
	 private router: Router,
	 private authService: AuthService,
	 private testService: TestService,
	 private flashMessage: FlashMessagesService
	 ) {
	}

	ngOnInit() {
	}

	onSubmit(){
	}
}
