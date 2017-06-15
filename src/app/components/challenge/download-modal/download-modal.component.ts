import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styles: []
})
export class DownloadModalComponent implements OnInit {

	modalActions = new EventEmitter<string | MaterializeAction>();

	constructor() { }

	ngOnInit() {
	}

	openModal(){
		this.modalActions.emit({ action: "modal", params: ['open'] });
	}

	closeModal() {
   	this.modalActions.emit({action:"modal",params:['close']});
 	}
}
