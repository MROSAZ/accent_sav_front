import { Component, OnInit } from '@angular/core';
import { SigninService } from './@core/service/signin.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private signInService: SigninService) {}

  ngOnInit(): void {
    // Clear local storage
    // localStorage.clear();

    // Clear session storage
    // sessionStorage.clear();

    // Clear cookies
    this.clearCookies();

    // Clear browser cache
    this.clearBrowserCache();
  }

  private clearCookies(): void {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }

  private clearBrowserCache(): void {
    if (caches) {
      caches.keys().then(function (names) {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }
  }
}
