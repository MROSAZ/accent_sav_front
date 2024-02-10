import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ReclamationsGuard implements CanActivate {
    constructor(private router: Router, private helper: JwtHelperService) {}

  canActivate() {
    const authorities = localStorage.getItem('authorities');
    console.log(authorities);
    console.log(authorities !== 'newsManager');
    if (authorities !== 'newsManager') {
      return true;
    }
    this.router.navigate(['/pages/dashboard']);
    return false;
  }

}
