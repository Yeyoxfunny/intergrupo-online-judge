import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

/* External Module */
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MaterializeModule } from 'angular2-materialize';

import { AuthGuard } from './guards/auth.guard';

/* Own Modules */
import { LayoutsModule } from './layouts/layouts.module';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';

/* Own Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HackrankComponent } from './components/hackrank/hackrank.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { DownloadModalComponent } from './components/challenge/download-modal/download-modal.component';
import { SubmitModalComponent } from './components/challenge/submit-modal/submit-modal.component';

/* Services */
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ChallengeService } from './services/challenge.service';
import { UploadService } from './services/upload.service';
/* App Routes */
import { appRoutes } from './app.route';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HackrankComponent,
    ChallengeComponent,
    DownloadModalComponent,
    SubmitModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    LayoutsModule,
    AccountModule,
    AdminModule,
    FlashMessagesModule,
    MaterializeModule 
  ],
  providers: [ValidateService, AuthService, ChallengeService, AuthGuard, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
