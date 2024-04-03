import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenteComponent } from './vente.component';
import {CardsVenteComponent} from './cards-vente/cards-vente.component';
import {VentesRoutingModule} from './ventes-routing.module';
import {
  NbAccordionModule,
  NbButtonModule, NbCardModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule,
} from '@nebular/theme';
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    VenteComponent,
    CardsVenteComponent,
  ],
    imports: [
        VentesRoutingModule,
        CommonModule,
        NbAccordionModule,
        NbButtonModule,
        NbIconModule,
        NbInputModule,
        NbOptionModule,
        NbSelectModule,
        NbCardModule,
        FormsModule,
        TranslateModule,
    ],
})
export class VenteModule { }
