import { Component, OnInit } from '@angular/core';

/* External libraries */
import * as Materialize from "angular2-materialize";

/* Settings */
import { AppSettings } from '../../app.settings';

/* Services */
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { UploadService } from '../../services/upload.service';

/* Models */
import { User, UserBuilder } from '../../model/user';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	private user: User = UserBuilder.getEmptyUser();
	private previousImageUrl: string;
	private fileToUpload: any;
	acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;

	constructor(
		private authService: AuthService,
		private uploadService: UploadService,
		private userService: UsersService
	) {

	}

	ngOnInit() {
		let tempUser: User = this.authService.getStoredUserData();

		this.userService.getById(tempUser.Id)
							.subscribe(userData => {
											this.user = userData;
											this.previousImageUrl = this.user.imageUrl;
										})
	}

	fileChangeEvent(fileInput) {
		let tempFile = fileInput.target.files[0];
		let isValidFile: boolean = this.acceptFileTypes.test(tempFile.type);

		if (!isValidFile) {
			Materialize.toast('Archivo no soportado, extensiones válidas: gif, png, jpg, jpeg', 4000);
			return;
		}

		this.fileToUpload = tempFile;
		this.renderImageFromFile(tempFile);
	}

	saveImage(){
		let params = { _id: this.user.id };

		this.uploadService
			.makeFileRequest([ this.fileToUpload ], AppSettings.imageProfileUrl, params)
			.then((response: any) => {
				let fileName = JSON.parse(response).name;

				this.user.imageUrl = AppSettings.imageProfileBaseUrl + fileName;

				this.userService.updateImage(this.user.id, this.user)
									.subscribe(response => {
										this.authService.updateStoreUserData(this.user);
										this.fileToUpload = undefined;
									});
			})
			.catch(error => Materialize.toast('Ha ocurrido un error al intentar actualizar su imagen de perfil'));
	}

	cancelUpload(){
		this.fileToUpload = undefined;
		this.user.imageUrl = this.previousImageUrl;
	}

	private renderImageFromFile(file: File) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.user.imageUrl = reader.result;
		reader.onerror = console.error;
	}
}
