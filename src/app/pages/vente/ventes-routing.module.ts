import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {VenteComponent} from './vente.component';
import {CardsVenteComponent} from './cards-vente/cards-vente.component';

const routes: Routes = [{
  path: '',
  component: VenteComponent,
  // canActivate: [CitoyenGuard],
  children: [
    {
      path: 'cards',
      component: CardsVenteComponent,
    },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentesRoutingModule {
}
