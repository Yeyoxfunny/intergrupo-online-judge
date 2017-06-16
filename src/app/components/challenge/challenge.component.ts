import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Services */
import { ChallengeService } from '../../services/challenge.service';

/* Components */
import { DownloadModalComponent } from './download-modal/download-modal.component';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';

/* Models */
import { Challenge, ChallengeBuilder } from '../../model/challenge';

@Component({
	selector: 'app-challenge',
	styleUrls: ['./challenge.component.css'],
	templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {

	private challenge: Challenge = ChallengeBuilder.getEmptyTest();

	@ViewChild(DownloadModalComponent) downloadModal: DownloadModalComponent;
	@ViewChild(SubmitModalComponent) submitModal: SubmitModalComponent;

	constructor(
		private challengeService: ChallengeService,
		private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			this.challengeService.getById(id).subscribe(data => {
				this.challenge = data;
				console.log(this.challenge.languages)
			});
		})
	}

	getFile(link){

	}

	downloadChallenge(){
		this.downloadModal.openModal(this.challenge.languages);
	}

	submitChallenge(){
		this.submitModal.openModal();
	}
}
