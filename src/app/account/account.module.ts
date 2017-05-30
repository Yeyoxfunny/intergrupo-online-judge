import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsModule } from '../layouts/layouts.module';

import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

import { UsersService } from '../services/users.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule
  ],
  declarations: [
  		ProfileComponent,
  		PublicProfileComponent
  ],
  providers: [ UsersService ]
})
export class AccountModule { }
