import { Routes } from '@angular/router';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTestComponent } from './register-test/register-test.component';

export const adminRoutes: Routes = [
    				{ 
    					path: 'admin', 
    					component: DashboardComponent,
  						children: [
  							{ path: '', component: AdminHomeComponent },
	                  { path: 'register', component: RegisterTestComponent },
	               ]
    				}
    		]