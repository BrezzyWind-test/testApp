import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SharedModuleModule } from '../../modules/shared-module/shared-module.module';

@NgModule({
  declarations: [AuthComponent],
  exports: [AuthComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModuleModule,
  ],
})
export class AuthModule {}
