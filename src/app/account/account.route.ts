import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

export const accountRoutes: Routes = [
						{ path: 'me', component: ProfileComponent },
						{ path: 'user/:id', component: PublicProfileComponent }
					];