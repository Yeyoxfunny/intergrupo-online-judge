import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

	title: string;
	exampleHtml: string;
	language: string;
	sourceCodeUrl: string;
	dificulty: string;

	constructor(private testService: TestService,
					private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			this.testService.getTestById(id).subscribe(response => {
				this.title = response.title;
				this.exampleHtml = response.exampleHtml;
				this.language = response.language;
				this.sourceCodeUrl = response.sourceCodeUrl;
				this.dificulty = response.dificulty;
			});
		})
	}

}
