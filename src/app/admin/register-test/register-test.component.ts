import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

/* External libraries */
import * as Materialize from "angular2-materialize";
import { FlashMessagesService } from 'angular2-flash-messages';

/* Settings */
import { AppSettings } from '../../app.settings';

/* Services */
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { UploadService } from '../../services/upload.service';

/* Models */
import { Challenge, ChallengeBuilder } from '../../model/challenge';
import { Language } from '../../model/language';
import { Difficulties } from '../../model/difficulty';

@Component({
  selector: 'app-register-test',
  styleUrls: ['./register-test.component.css'],
  templateUrl: './register-test.component.html'
})

export class RegisterTestComponent implements OnInit {

  difficulties: Array<any>;
  testDescriptionHTML: string;
  titleChallenge: string;
  difficultyIndex: number = 0;

  private supportedLanguages = [
    { value: "Java", checked: false, file: undefined },
    { value: "C#", checked: false, file: undefined }
  ];

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
    let challengeTitleWithoutSpaces = this.titleChallenge.replace(/\s/g, "-");

    let selectedLanguages = this.getSelectedLanguages();

    let challenge: Challenge = new ChallengeBuilder()
      .setTitle(this.titleChallenge)
      .setDescriptionHTML(JSON.stringify(this.testDescriptionHTML))
      .setDifficulty(this.difficulties[this.difficultyIndex])
      .setLanguages(selectedLanguages)
      .build();

    this.saveChallenge(challenge);
  }

  saveChallenge(challenge: Challenge) {

    let filesToUpload: File[] = this.supportedLanguages.filter(x => x.checked).map(x => x.file);
    let challengeTitleWithoutSpaces = this.getTitleWithoutSpaces();

    this.challengeService.add(challenge).subscribe(
      (response) => {
        this.uploadsService.makeFileRequest(filesToUpload, AppSettings.filesChallengeUrl,
          { title: challengeTitleWithoutSpaces });
        this.router.navigate(['app']);
      },
      (error) => {
        this.flashMessage.show(error, {
          cssClass: 'alert alert-dismissible alert-danger',
          timeout: 5000
        });
      });
  }

  fileChangeEvent(language, fileInput: any) {
    let file: File = fileInput.target.files[0];

    /* Object of the variable supportedLanguages */
    language.file = file;
  }

  optionChange(value) {
    this.difficultyIndex = value;
  }

  private getSelectedLanguages() {
    let challengeTitleWithoutSpaces = this.getTitleWithoutSpaces();

    return this.supportedLanguages
      .filter(x => x.checked)
      .map(x => new Language(x.value, `${challengeTitleWithoutSpaces}/${x.file.name}`));
  }

  private getTitleWithoutSpaces(): string {
    return this.titleChallenge.replace(/\s/g, "-");
  }
}
