import {Component, OnInit} from '@angular/core';
import {SigninService} from '../../@core/service/signin.service';
import {Credentials} from '../credentials';
import {User} from './../credentials';
import {NavigationEnd, Router} from '@angular/router';
import {owner, version} from '../../global.config';
import {
  NbGlobalPhysicalPosition,
  NbLayoutDirection,
  NbLayoutDirectionService,
  NbSpinnerService,
  NbToastrService,
} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  showPassword = true;

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
      public router: Router,
      public toastrService: NbToastrService,
      private signinService: SigninService,
    private layoutService: NbLayoutDirectionService,
  ) {

    this.credentials = new Credentials();
    this.version = version;
    this.owner = owner;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const params = this.router.parseUrl(this.router.url).queryParams;
        if (Object.keys(params).indexOf('logout') > -1 /*&& localStorage.length > 0*/) {
          try {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('auth-refreshtoken');
          } finally {
            let msg = 'bye';
            if (Object.keys(params).indexOf('msg') > -1) {
              msg = params['msg'];
            }

            this.router.navigate(['/']);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.spinner$.load();
  }

  login() {

    this.loading = true;

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    this.signinService.login(this.credentials).subscribe(
      currentUser => {
        this.loading = false;
        this.signinService.currentUser = currentUser;
        if (currentUser.authorities[0].label === 'citoyen') {
          alert('vous avez pas le droit d\'accées');
        } else {
          localStorage.setItem('token', currentUser.token);
          // localStorage.setItem('currentUser', JSON.stringify(currentUser));
          // localStorage.setItem('auth-refreshtoken', currentUser.refreshToken)
          localStorage.setItem('authorities', currentUser.authorities[0].label);
          localStorage.setItem('id', currentUser.id);
          this.router.navigate(['/pages']);
        }}, (error) => {
        this.loading = false;
        this.toastrService.danger('Vérifier vos Cordonnées', 'Alerte!', {
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
