import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavComponent } from './sav.component';
import {RouterOutlet} from '@angular/router';
import { SavCardsComponent } from './sav-cards/sav-component.component';
import {SavRoutingModule} from './sav-routing.module';
import {NbButtonModule, NbCardModule, NbIconModule, NbOptionModule, NbSelectModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { SavComponentsComponent } from './sav-cards/sav-components/sav-components.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SavComponent,
    SavCardsComponent,
    SavComponentsComponent,
  ],
  imports: [
    SavRoutingModule,
    CommonModule,
    RouterOutlet,
    NbCardModule,
    NbIconModule,
    NbOptionModule,
    NbSelectModule,
    NbButtonModule,
    Ng2SmartTableModule,
    FormsModule,
  ],
})
export class SavModule { }
