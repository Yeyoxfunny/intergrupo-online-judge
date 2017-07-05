import { Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

export const accountRoutes: Routes = [
						{ path: 'me', component: ProfileComponent, canActivate: [ AuthGuard ] },
						{ path: 'user/:username', component: PublicProfileComponent, canActivate: [ AuthGuard ] }
					];
