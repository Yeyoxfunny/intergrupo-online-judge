import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Difficulties } from '../../model/difficulty';

/* Models */
import { Challenge, ChallengeBuilder } from '../../model/challenge';
import { Language } from '../../model/language';

@Component({
  selector: 'app-register-test',
  templateUrl: './register-test.component.html'
})

export class RegisterTestComponent implements OnInit {
	
	difficulties: Array<any>;
	testDescriptionHTML: string;
	titleChallenge: string;
	difficultyIndex: number;
	supportedLanguages = [{ value: "Java", checked: false},{ value: "C#", checked: false}];

	constructor(
	 private router: Router,
	 private authService: AuthService,
	 private challengeService: ChallengeService,
	 private flashMessage: FlashMessagesService
	 ) {
	}

	ngOnInit() {
		this.difficulties = Difficulties;
	}

	onSubmit(){
		let languages: Language[] = this
								.supportedLanguages
								.filter(x => x.checked)
								.map(x =>  new Language(x.value, ""));
		
		let challenge: Challenge = new ChallengeBuilder()
								.setTitle(this.titleChallenge)
								.setDescriptionHTML(JSON.stringify(this.testDescriptionHTML))
								.setDifficulty(this.difficulties[this.difficultyIndex])
								.setLanguages(languages)
								.build();

	this.challengeService.add(challenge).subscribe(
			(response) => {
				this.router.navigate(['home']);
			},
			(error) => {
				this.flashMessage.show(error, {
          		cssClass: 'alert alert-dismissible alert-danger',
          		timeout: 5000
        	});
		});
	}
}
