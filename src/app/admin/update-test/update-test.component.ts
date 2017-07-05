import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterTestComponent } from '../register-test/register-test.component';
import { ChallengeService } from '../../services/challenge.service';
import { ActivatedRoute } from '@angular/router';
import { Challenge, ChallengeBuilder } from '../../model/challenge';
import { Language } from '../../model/language';
import { Difficulties } from '../../model/difficulty';
import { UploadService } from '../../services/upload.service';
import { AppSettings } from '../../app.settings';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styles: []
})
export class UpdateTestComponent implements OnInit {
  difficulties: Array<any>;
  testDescriptionHTML: string;
  titleChallenge: string;
  difficultyIndex: number;
  private languages: Language[] = [];
  initialDifficulty: string;
  challengeId: string;
  private supportedLanguages = [
    { value: "Java", checked: false, file: undefined },
    { value: "C#", checked: false, file: undefined }
  ];
  registerTest: RegisterTestComponent;
  private challenge: Challenge = ChallengeBuilder.getEmptyTest();
  constructor(
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.challengeService.getById(id).subscribe(data => {
        this.challenge = data;
        this.titleChallenge = data.title;
        this.languages = data.languages;
        this.initialDifficulty = data.difficulty;
        this.difficultyIndex = this.initialIndexDifficulty(data.difficulty);
        this.testDescriptionHTML = data.descriptionHTML;
      });
      this.route.params.subscribe(
        param => {
          this.challengeId = param['id']
        }
      );
    });

    this.difficulties = Difficulties;
  }
  optionChange(value) {
    this.difficultyIndex = value;
  }
  fileChangeEvent(language, fileInput: any) {
    let file: File = fileInput.target.files[0];

    /* Object of the variable supportedLanguages */
    language.file = file;
    language.sourceCodeUrl = `${this.getTitleWithoutSpaces()}/${file.name}`;
  }
  onSubmit() {
    let challenge: Challenge = new ChallengeBuilder()
      .setTitle(this.titleChallenge)
      .setDescriptionHTML(JSON.stringify(this.testDescriptionHTML))
      .setDifficulty(this.difficulties[this.difficultyIndex])
      .setLanguages(this.languages)
      .build();

    this.updateChallenge(this.challengeId, challenge);
  }
  updateChallenge(id, challenge: Challenge) {
    let filesToUpload: File[] = this.languages.map(x => x.file);
    let challengeTitleWithoutSpaces = this.getTitleWithoutSpaces();
    this.challengeService.update(id, challenge).subscribe(
      (response) => {
        this.uploadService.makeFileRequest(filesToUpload, AppSettings.filesChallengeUrl,
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
  private getTitleWithoutSpaces(): string {
    return this.titleChallenge.replace(/\s/g, "-");
  }
  initialIndexDifficulty(difficulty){
    switch (difficulty) {
      case 'Facil':
        return 0;
      case 'Medio':
        return 1;
      case 'Dificil':
        return 2;
    }
  }

}
