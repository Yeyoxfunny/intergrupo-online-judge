import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MaterializeDirective } from "angular2-materialize";
import * as Materialize from "angular2-materialize";

import { Difficulties } from '../../model/difficulty';

/* Models */
import { Challenge, ChallengeBuilder } from '../../model/challenge';
import { Language } from '../../model/language';
import { UploadService } from '../../services/upload.service';

@Component({
	selector: 'app-register-test',
	templateUrl: './register-test.component.html'
})

export class RegisterTestComponent implements OnInit {
	value;
	difficulties: Array<any>;
	testDescriptionHTML: string;
	titleChallenge: string;
	difficultyIndex: number = 0;
	supportedLanguages = [{ value: "Java", checked: false, file: undefined }, { value: "C#", checked: false, file: undefined }];
	languages;
	filesToUpload: File[] = [];
	files;
	constructor(
		private router: Router,
		private authService: AuthService,
		private challengeService: ChallengeService,
		private flashMessage: FlashMessagesService,
		private uploadsService: UploadService
	) { }

	ngOnInit() {
		this.difficulties = Difficulties;
	}

	onSubmit() {
		let params = {
			titulo: this.titleChallenge.split(" ").join("-")
		}

		let challenge: Challenge = new ChallengeBuilder()
			.setTitle(this.titleChallenge)
			.setDescriptionHTML(JSON.stringify(this.testDescriptionHTML))
			.setDifficulty(this.difficulties[this.difficultyIndex])
			.setLanguages(this.languages)
			.build();

		this.challengeService.add(challenge).subscribe(
			(response) => {
				this.uploadsService.makeFileRequest(this.filesToUpload, 'http://localhost:3001/api/upload/file', params);
				this.router.navigate(['app']);
			},
			(error) => {
				this.flashMessage.show(error, {
					cssClass: 'alert alert-dismissible alert-danger',
					timeout: 5000
				});
			});
	}

	onSelect(check, value) {
		if (check) {
			this.value = value;
			Materialize.toast('seleccionado: ' + value, 2000);
		} else {
			console.log('desselecionado: ' + value);
		}
	}

	fileChangeEvent(fileInput: any) {
		let file = fileInput.target.files[0];
		this.filesToUpload.push(file);
		console.log(this.filesToUpload);
		console.log(this.value);
		this.filesToUpload.forEach((x, i) => this.files = this.filesToUpload[i].name);

		this.languages = this
			.supportedLanguages
			.filter(x => x.checked)
			.map(x => new Language(x.value, `${this.titleChallenge.split(" ").join("-")}/${x.value === 'Java' ? this.filesToUpload[0].name || this.filesToUpload[1].name : x.value === 'C#' && this.filesToUpload[1] === undefined ? this.filesToUpload[0].name : this.filesToUpload[1].name}`));
	}

	optionChange(value) {
		this.difficultyIndex = value;
	}
}
