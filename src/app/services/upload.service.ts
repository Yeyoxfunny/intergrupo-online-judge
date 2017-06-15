import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

	constructor() { }

	makeFileRequest(files: Array<File>, url: string, params: any){
		return new Promise((resolve, reject) => {

			let formData : FormData = new FormData();
			let xhr: XMLHttpRequest = new XMLHttpRequest();

			for(let i = 0; i < files.length; i++){
				formData.append("uploads[]", files[i], files[i].name);	
			}
			if (params.titulo) {
				formData.append('titulo', params.titulo);
			}

			if (params._id) {
				formData.append('_id', params._id);
			}
			
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4){
					if(xhr.status !== 200){
						return reject(xhr.response);
					}
					resolve(xhr.response);
				}
			}

			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}
}