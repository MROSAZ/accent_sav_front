import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LayoutService } from './utils';
import { AuthGuard } from './utils/AuthGuard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SigninService } from './service/signin.service';
import { NbSelectModule } from '@nebular/theme';

import {SuperAdminGuard} from './utils/SuperAdminGuard';
import {AdminGuard} from './utils/AdminGuard';
import {CitoyenGuard} from './utils/CitoyenGuard';
import {NewsManagerGuard} from './utils/NewsManagerGuard';
import {SuperVisorAssignedGuard} from './utils/SuperVisorAssignedGuard';
import {ReclamationsGuard} from './utils/ReclamationsGuard';
import {DataManagementGuard} from './utils/DataManagementGuard';



export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  LayoutService,
  AuthGuard,
  SuperAdminGuard,
  AdminGuard,
  CitoyenGuard,
  SuperVisorAssignedGuard,
  NewsManagerGuard,
  ReclamationsGuard,
  DataManagementGuard,
  JwtHelperService,
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  SigninService,
];

@NgModule({
  imports: [
    CommonModule,
    NbSelectModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
