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
import { User } from '../../model/user';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	private user: User;
	private id: string;
	private name: string;
	private firstName: string;
	private firstLastName: string;
	private username: string;
	private email: string;
	private imageUrl: string;
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
		console.log(tempUser.Id)

		this.userService.getById(tempUser.Id).subscribe(userData => {
			console.log(userData)
			this.user = userData;
			this.id = this.user.Id;
			this.name = this.user.Name;
			this.firstName = this.name.split(" ")[0];
			this.firstLastName = this.name.split(" ")[1];
			this.username = this.user.UserName;
			this.email = this.user.Email;
			this.imageUrl = this.user.ImageUrl;
			this.previousImageUrl = this.imageUrl;
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
		let params = { _id: this.id };
		this.uploadService
					.makeFileRequest([ this.fileToUpload ], AppSettings.imageProfileUrl, params)
					.then(response => {
						this.authService.updateStoreUserData(this.user);
					})
					.catch(error => Materialize.toast('Ha ocurrido un error al intentar actualizar su imagen de perfil'));
	}

	cancelUpload(){
		this.fileToUpload = undefined;
		this.imageUrl = this.previousImageUrl;
	}

	private renderImageFromFile(file: File) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.imageUrl = reader.result;
		reader.onerror = console.error;
	}
}
