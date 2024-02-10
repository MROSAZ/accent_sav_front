import { Component, OnInit } from '@angular/core';
import {Credentials, User} from '../credentials';
import {TranslateService} from '@ngx-translate/core';
import {owner, version} from '../../global.config';
import {
  NbGlobalPhysicalPosition,
  NbLayoutDirection,
  NbLayoutDirectionService,
  NbSpinnerService,
  NbToastrService,
} from '@nebular/theme';
import {NavigationEnd, Router} from '@angular/router';
import {SigninService} from '../../@core/service/signin.service';
@Component({
  selector: 'ngx-mail-reset',
  templateUrl: './mail-reset.component.html',
  styleUrls: ['./mail-reset.component.scss'],
})
export class MailResetComponent implements OnInit {

  showPassword = true;
  email: any = {email: ''};
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  credentials: Credentials;
  loading = false;
  public currentUser: User = new User();
  version = '';
  owner: string;
  selectedLanguage: string = undefined;
  constructor(
    public translate: TranslateService,
    private spinner$: NbSpinnerService,
    public toastrService: NbToastrService,
    private signinService: SigninService,
    private layoutService: NbLayoutDirectionService,
  ) {

    this.version = version;
    this.owner = owner;
  }

  ngOnInit() {
    this.spinner$.load();
  }

  login() {

    this.loading = true;
    this.signinService.getResetPasswordLink(this.email).subscribe(email => {
      this.loading = false;
      this.toastrService.success('Vérifier votre email pour reseter mot de passe', 'Alerte!', {
        destroyByClick: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        duration: 10000,
      });
    });
  }
  translateLanguageTo(lang: string) {
    if (lang !== undefined) {
      this.translate.use(lang);
      if (lang === 'ar') {
        this.layoutService.setDirection(NbLayoutDirection.RTL);
      } else {
        this.layoutService.setDirection(NbLayoutDirection.LTR);
      }
      localStorage.setItem('lang', lang);
    }
  }

  protected readonly undefined = undefined;

}
