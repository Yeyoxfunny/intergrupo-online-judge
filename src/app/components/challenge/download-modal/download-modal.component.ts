import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';

import { Language } from '../../../model/language';
import { DownloadService } from '../../../services/download.service';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styles: []
})
export class DownloadModalComponent implements OnInit {

  private languages: Language[] = [];

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private downloadService: DownloadService) { }

  ngOnInit() {
  }

  openModal(languages: Array<Language>) {
    console.log(languages)
    this.languages = languages;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }

  downloadFile(sourceCodeUrl) {
    this.downloadService.downloadChallenge(sourceCodeUrl).subscribe(
      data => window.open(data.url) ,
      error => console.log("Error downloading the file." + error),
      () => console.log('Completed file download.')
    )
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}
