import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Difficulties } from '../../model/difficulty';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	
	difficulties: Array<any>;
	testDescriptionHTML: string;
	titleTest: string;
	difficultyIndex: number;
	supportedLanguages;

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
		const test = {
			title: this.titleTest,
			exampleHtml: this.sanitizeDescription(this.testDescriptionHTML),
			dificulty: this.difficulties[this.difficultyIndex],
			language: "Java,C#",
			sourceCode: "sourcecode"
		};
		console.log(test);
		/*this.testService.addTest(test).subscribe((response) => {
			console.log(response);
			//this.router.navigate(['home']);
		}, (error) => {
			this.flashMessage.show('Ha ocurrido un error', {
          	cssClass: 'alert alert-dismissible alert-danger',
          	timeout: 5000
        	});
			console.error(error);
		});*/
	}

	sanitizeDescription(description: string){
		let descriptionStr = JSON.stringify(description);
		let finalDescription = descriptionStr.replace(/\\n/g, "");
		return finalDescription.substring(1, finalDescription.length - 1);
	}
}
