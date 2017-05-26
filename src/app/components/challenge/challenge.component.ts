import { Test, TestBuilder } from '../../model/test';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {

	private test: Test = TestBuilder.getEmptyTest();

	constructor(private testService: TestService,
					private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			this.testService.getTestById(id).subscribe(data => {
				this.test = data;
			});
		})
	}
}
