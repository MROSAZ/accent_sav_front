import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {NotificationComponent} from './notification/notification.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  // canActivate: [CitoyenGuard],
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'notification',
      component: NotificationComponent,
    },
    {
      path: 'data',
      loadChildren: () => import('./data-management/data-management.module')
        .then(m => m.DataManagementModule),
    },
    {
      path: 'production',
      loadChildren: () => import('./production/production.module')
        .then(m => m.ProductionModule),
    },
    {
      path: 'vente',
      loadChildren: () => import('./vente/vente.module')
        .then(m => m.VenteModule),
    },
    {
      path: 'sav',
      loadChildren: () => import('./sav/sav.module')
        .then(m => m.SavModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
