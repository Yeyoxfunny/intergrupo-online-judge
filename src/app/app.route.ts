import { Routes } from '@angular/router';

/* Module Routes */
import { accountRoutes } from './account/account.route';
import { adminRoutes } from './admin/admin.route';


/* App Components */
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HackrankComponent } from './components/hackrank/hackrank.component';
import { ChallengeComponent } from './components/challenge/challenge.component';

import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    ...accountRoutes,
    ...adminRoutes,
    { 
      path: 'app',
      children: [
        { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'challenge/:id', component: ChallengeComponent, canActivate: [AuthGuard] },
        { path: 'rank', component: HackrankComponent, canActivate: [AuthGuard] }
      ]
    }   
];
