import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routes';

@NgModule({
  declarations: [],
  imports: [LoginComponent, CommonModule, RouterModule.forChild(LoginRoutes)],
})
export class LoginModule {}
