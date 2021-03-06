import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Own Modules */
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';

/* External Modules */
import { CKEditorModule  } from 'ng2-ckeditor';
import { MaterializeModule } from "angular2-materialize";

/* Own Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTestComponent } from './register-test/register-test.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UpdateTestComponent } from './update-test/update-test.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule,
    MaterializeModule,
    LayoutsModule
  ],
  declarations: [
  		DashboardComponent,
  		RegisterTestComponent,
  		AdminHomeComponent,
  		UpdateTestComponent
  ]
})
export class AdminModule { }
