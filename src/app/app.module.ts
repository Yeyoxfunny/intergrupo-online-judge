import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

/* Own Modules */
import { LayoutsModule } from './layouts/layouts.module';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';

//Owns Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { HackrankComponent } from './components/hackrank/hackrank.component';
import { ChallengeComponent } from './components/challenge/challenge.component';

/* App Routes */
import { accountRoutes } from './account/account.route';
import { adminRoutes } from './admin/admin.route';

//Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { TestService } from './services/test.service';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    ...accountRoutes,
    ...adminRoutes,
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'challenge/:id', component: ChallengeComponent, canActivate: [AuthGuard] },
    { path: 'rank', component: HackrankComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HackrankComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    LayoutsModule,
    AccountModule,
    AdminModule,
    FlashMessagesModule 
  ],
  providers: [ValidateService, AuthService, TestService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
