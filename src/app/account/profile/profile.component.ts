import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	
	private id: string;
	private name: string;
	private firstName: string;
	private firstLastName: string;
	private username: string;
	private email: string;
	private imageUrl: string = "assets/skrollex.png";

	acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;

	constructor(private authService: AuthService) { 

	}

	ngOnInit() {
		let user: User = this.authService.getStoredUserData();
		this.id = user.Id;
		this.name =  user.Name;
		this.firstName = this.name.split(" ")[0];
		this.firstLastName = this.name.split(" ")[1];
		this.username = user.UserName;
		this.email = user.Email;
		//this.imageUrl = user.ImageUrl;
	}

	fileChangeEvent(fileInput){
		let file = fileInput.target.files[0];
		let isValidFile: boolean = this.acceptFileTypes.test(file.type);

		if(!isValidFile){
			console.error('This is not a valid file')
			return;
		}

		this.renderImageFromFile(file);	
	}

	renderImageFromFile(file : File){
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => this.imageUrl = reader.result;
		reader.onerror = console.error;
	}
}
