import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import {ProductionRoutingModule} from './production-routing.module';
import { CardsComponent } from './cards/cards.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {TranslateModule} from '@ngx-translate/core';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    ProductionComponent,
    CardsComponent,
  ],
    imports: [
        CommonModule,
        ProductionRoutingModule,
        NbCardModule,
        NbIconModule,
        Ng2SmartTableModule,
        TranslateModule,
        NbAccordionModule,
        NbSelectModule,
        NbButtonModule,
        NbInputModule,
        MatTabsModule,
    ],
})
export class ProductionModule { }
