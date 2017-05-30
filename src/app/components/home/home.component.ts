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

	constructor(private challengeService: ChallengeService) { }

	ngOnInit() {
		console.log('Hello')
		this.challengeService.getAll()
							.subscribe((data) => this.challenges = data, 
											errorMsg => this.challenges = []);
	}

}
