import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SavComponent} from './sav.component';
import {SavCardsComponent} from './sav-cards/sav-component.component';


const routes: Routes = [
  {
    path: '',
    component: SavComponent,
    children: [
      {
        path: 'cards',
        // canActivate: [SuperAdminGuard],
        component: SavCardsComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavRoutingModule { }
