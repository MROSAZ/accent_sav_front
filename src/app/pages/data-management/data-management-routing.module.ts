import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementComponent } from './data-management.component';
import {AuthorityComponent} from './authority/authority.component';
import {AdminComponent} from './admin/admin.component';
import {NotificationComponent} from '../notification/notification.component';
import {CategoriesComponent} from './categories/categories.component';
import {ComponentComponent} from './component/component.component';
import {ClientComponent} from './client/client.component';
import {ModelCardComponent} from './model-card/model-card.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementComponent,
    children: [
      {
        path: 'admin',
        // canActivate: [SuperAdminGuard],
        component: AdminComponent,
      },
      {
        path: 'authorities',
        // canActivate: [SuperAdminGuard],
        component: AuthorityComponent,
      },
      {
        path: 'categoies_component',
        // canActivate: [SuperAdminGuard],
        component: CategoriesComponent,
      },
      {
        path: 'client',
        // canActivate: [SuperAdminGuard],
        component: ClientComponent,
      },
      {
        path: 'model',
        // canActivate: [SuperAdminGuard],
        component: ModelCardComponent,
      },
      {
        path: 'components',
        // canActivate: [SuperAdminGuard],
        component: ComponentComponent,
      },
      {
        path: 'notification',
        // canActivate: [AdminGuard],
        component: NotificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataManagementRoutingModule { }
