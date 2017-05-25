import { Component, OnInit } from '@angular/core';

import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {	

	Tests: Array<any>

	constructor(private testService: TestService) { }

	ngOnInit() {
		this.testService.getAllTests()
							.then((data) => this.Tests = data)
							.catch(errorMsg => {
								this.Tests = [];
							});
	}

}
