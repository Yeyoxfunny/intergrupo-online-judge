import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { CKEditorModule  } from 'ng2-ckeditor';

//Owns Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HackrankComponent } from './components/hackrank/hackrank.component';
import { ChallengeComponent } from './components/challenge/challenge.component';

//Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { TestService } from './services/test.service';
import { RegisterTestComponent } from './components/register-test/register-test.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'challenge/:id', component: ChallengeComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { 
      path: 'dashboard', 
      component: DashboardComponent,
      children: [
                  { path: 'register', component: RegisterTestComponent },
                ]
    },
    { path: 'rank', component: HackrankComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    HackrankComponent,
    ChallengeComponent,
    RegisterTestComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    CKEditorModule 
  ],
  providers: [ValidateService, AuthService, TestService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
