import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserBuilder } from '../../model/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

	private user: User = UserBuilder.getEmptyUser();

	constructor(private route: ActivatedRoute,
					private usersService: UsersService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = params['id'];
			this.usersService.getById(id).subscribe(data => this.user = data);
		})
	}
}
