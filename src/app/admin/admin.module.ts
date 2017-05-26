import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Own Modules */
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* External Modules */
import { CKEditorModule  } from 'ng2-ckeditor';

/* Own Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterTestComponent } from './register-test/register-test.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule
  ],
  declarations: [
  		DashboardComponent,
  		RegisterTestComponent
  ]
})
export class AdminModule { }
