import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from "angular2-materialize";

import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule
  ],
  declarations: [
  		NavbarComponent,
  		SidenavComponent
  ],
  exports: [
  		NavbarComponent
  ]
})
export class LayoutsModule { }