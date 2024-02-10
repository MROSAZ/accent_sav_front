import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuard} from '../../@core/utils/AdminGuard';
import {HistoricalComponent} from './historical.component';
import {ReclamationStatsUserComponent} from './reclamation-stats-user/reclamation-stats-user.component';
import {
  ReclamationStatsSubCategoryComponent,
} from './reclamation-stats-sub-category/reclamation-stats-sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: HistoricalComponent,
    canActivate: [AdminGuard ],
    children: [
      {
        path: 'reclamations',
        component: ReclamationStatsUserComponent,
      },
      {
        path: 'reclamations-per-categories',
        component: ReclamationStatsSubCategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricalRoutingModule { }
