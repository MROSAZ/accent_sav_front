import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {owner, version} from '../../global.config';
import {
  NbGlobalPhysicalPosition,
  NbLayoutDirection,
  NbLayoutDirectionService,
  NbSpinnerService,
  NbToastrService,
} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {SigninService} from '../../@core/service/signin.service';
import {ResetData} from '../../@core/data';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  credentials: ResetData;
  token: string = '';
  showPassword = true;
  loading: boolean = false;
  password: any = '';
  repeatPassword: any = '';
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  version = '';
  owner: string;
  selectedLanguage: string = undefined;
  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private spinner$: NbSpinnerService,
    public toastrService: NbToastrService,
    private signinService: SigninService,
    private layoutService: NbLayoutDirectionService,
  ) {
    this.credentials = new ResetData();
    this.version = version;
    this.owner = owner;
  }

  ngOnInit() {
    this.spinner$.load();
  }

  login() {

    this.loading = true;
    this.route.params.subscribe(params => {
      this.credentials.token = params['token'];
      if (this.credentials.password === this.credentials.repeatPassword) {
        this.signinService.resetPassword(this.credentials).subscribe(resetpasswor => {
          this.loading = false;
          this.toastrService.success('Mot de passe modifier avec succès', 'Alerte!', {
            destroyByClick: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 10000,
          });
        });
      } else {
          alert('les mot de passe n\'est pas identique');
          this.loading = false;
      }
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
