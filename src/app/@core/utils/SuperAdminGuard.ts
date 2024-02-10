import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    constructor(private router: Router, private helper: JwtHelperService) {}

  canActivate() {
    const authorities = localStorage.getItem('authorities');
    if (authorities === 'superAdmin') {
      return true;
    }
    this.router.navigate(['/pages/dashboard']);
    return false;
  }
}
