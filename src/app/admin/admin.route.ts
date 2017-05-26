import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTestComponent } from './register-test/register-test.component';

export const adminRoutes: Routes = [
    				{ 
    					path: 'admin', 
    					component: DashboardComponent,
  						children: [
	                  { path: 'register', component: RegisterTestComponent },
	               ]
    				}
    		]