import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductionComponent} from './production.component';
import {CardsComponent} from './cards/cards.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionComponent,
    children: [
      {
        path: 'cards',
        // canActivate: [SuperAdminGuard],
        component: CardsComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule { }
