import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { User, UserBuilder } from '../../model/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {

	private user: User = UserBuilder.getEmptyUser();

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.user = this.authService.getStoredUserData();
	}

}
