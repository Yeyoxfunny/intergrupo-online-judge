import { Component, OnInit } from '@angular/core';

import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../model/challenge';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	challenges: Array<Challenge>
	difficulty;
  isAdmin: boolean;
	constructor(
    private challengeService: ChallengeService,
    private authService: AuthService
    ) { }

	ngOnInit() {
		this.challengeService.getAll()
			.subscribe((data) => {
				this.challenges = data
			},
			errorMsg => this.challenges = []);
      this.isAdmin = this.authService.getStoredUserData().isAdmin;
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
