import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';

import { Language } from '../../../model/language';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styles: []
})
export class DownloadModalComponent implements OnInit {

	private languages: Language[] = [];

	modalActions = new EventEmitter<string | MaterializeAction>();
	
	constructor() { }

	ngOnInit() {
	}

	openModal(languages: Array<Language>){
		console.log(languages)
		this.languages = languages;
		this.modalActions.emit({ action: "modal", params: ['open'] });
	}

	closeModal() {
   	this.modalActions.emit({action:"modal", params:['close']});
 	}
}
