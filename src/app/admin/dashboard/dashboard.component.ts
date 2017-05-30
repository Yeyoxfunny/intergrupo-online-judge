import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { FlashMessagesService } from 'angular2-flash-messages';

/* Models */
import { Challenge, ChallengeBuilder } from '../../model/challenge';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

	constructor(
	 private router: Router,
	 private authService: AuthService,
	 private challengeService: ChallengeService,
	 private flashMessage: FlashMessagesService
	 ) {
	}

	ngOnInit() {
	}

	onSubmit(){
	}
}
