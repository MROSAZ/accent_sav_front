import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SigninComponent } from './signin/signin.component';
import { AuthenticationComponent } from './authentication.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {MailResetComponent} from './mail-reset/mail-reset.component';

const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  children: [
    {
      path: '',
      component: SigninComponent,
    },
    {
      path: 'reset-password/:token',
      component: ResetPasswordComponent,
    },
    {
      path: 'reset-form',
      component: MailResetComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}
