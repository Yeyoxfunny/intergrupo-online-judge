import { Component, OnInit } from '@angular/core';

import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../model/challenge';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	challenges: Array<Challenge>
	difficulty;
	//supportedLanguages = [{ name: "Facil" }, { value: "C#" }];
	constructor(private challengeService: ChallengeService) { }

	ngOnInit() {
		this.challengeService.getAll()
			.subscribe((data) => {
				this.challenges = data
			},
			errorMsg => this.challenges = []);
	}

	optionChange(value) {
		console.log(value);
	}

	filterByDifficulty(difficulty) {
		this.challengeService.getAll()
			.subscribe((data) => {
				this.challenges = data.filter(x => {
						return x.difficulty === difficulty
					})
			},
			errorMsg => this.challenges = []);
	}
}
