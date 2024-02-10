import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbSelectModule } from '@nebular/theme';
import { SigninService } from '../@core/service/signin.service';
import { ThemeModule } from '../@theme/theme.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin/signin.component';
import {TranslateModule} from '@ngx-translate/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MailResetComponent } from './mail-reset/mail-reset.component';

@NgModule({
    imports: [
        AuthenticationRoutingModule,
        ThemeModule,
        FormsModule,
        NbSelectModule,
        TranslateModule,
    ],
  declarations: [
    SigninComponent,
    AuthenticationComponent,
    ResetPasswordComponent,
    MailResetComponent,
  ],
  providers: [
    SigninService,
],
exports : [
],

})
export class AuthenticationModule {
}
