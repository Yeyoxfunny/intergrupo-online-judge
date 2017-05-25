import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Difficulties } from '../../model/difficulty';

/* Models */
import { Test, TestBuilder } from '../../model/test';
import { Language } from '../../model/language';

@Component({
  selector: 'app-register-test',
  templateUrl: './register-test.component.html',
  styleUrls: ['./register-test.component.css']
})

export class RegisterTestComponent implements OnInit {
	
	difficulties: Array<any>;
	testDescriptionHTML: string;
	titleTest: string;
	difficultyIndex: number;
	supportedLanguages = [{ value: "Java", checked: false},{ value: "C#", checked: false}];

	constructor(
	 private router: Router,
	 private authService: AuthService,
	 private testService: TestService,
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
		
		let test: Test = new TestBuilder()
								.setTitle(this.titleTest)
								.setDescriptionHTML(JSON.stringify(this.testDescriptionHTML))
								.setDifficulty(this.difficulties[this.difficultyIndex])
								.setLanguages(languages)
								.build();

	this.testService.addTest(test).subscribe(
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
