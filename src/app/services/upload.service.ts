import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

	constructor() { }

	makeFileRequest(files: Array<File>, url: string){
		return new Promise((resolve, reject) => {

			let formData : FormData = new FormData();
			let xhr: XMLHttpRequest = new XMLHttpRequest();

			for(let i = 0; i < files.length; i++){
				console.log(files);
				formData.append("uploads[]", files[i], files[i].name);	
			}
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4){
					if(xhr.status !== 200){
						console.log(xhr.status);
						return reject(xhr.response);
					}
					console.log(xhr.response);
					resolve(xhr.response);
				}
			}

			xhr.open("POST", url, true);
			console.log(formData);
			xhr.send(formData);
		});
	}
}