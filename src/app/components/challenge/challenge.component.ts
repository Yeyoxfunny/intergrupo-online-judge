import { Challenge, ChallengeBuilder } from '../../model/challenge';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChallengeService } from '../../services/challenge.service';

@Component({
	selector: 'app-challenge',
	templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {

	private challenge: Challenge = ChallengeBuilder.getEmptyTest();
	private languages: string[] = ["Java", "C#"];

	constructor(private challengeService: ChallengeService,
		private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			this.challengeService.getById(id).subscribe(data => {
				this.challenge = data;
				console.log(data);
			});
		})
	}

	
}
