import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styles: []
})
export class SubmitModalComponent implements OnInit {

	modalActions = new EventEmitter<string | MaterializeAction>();
	
	private languages: string[] = ["Java", "C#"];

	constructor() { }

	ngOnInit() {
	}

	openModal(){
		this.modalActions.emit({ action: "modal", params: ['open'] });
	}

	closeModal() {
   	this.modalActions.emit({action:"modal", params:['close']});
 	}
}
