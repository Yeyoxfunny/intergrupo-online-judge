import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Own Modules */
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';

/* External Modules */
import { CKEditorModule  } from 'ng2-ckeditor';

/* Own Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTestComponent } from './register-test/register-test.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule,
    LayoutsModule
  ],
  declarations: [
  		DashboardComponent,
  		RegisterTestComponent,
  		AdminHomeComponent
  ]
})
export class AdminModule { }
