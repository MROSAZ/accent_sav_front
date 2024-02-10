import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalComponent } from './historical.component';
import {RouterOutlet} from '@angular/router';
import { ReclamationStatsUserComponent } from './reclamation-stats-user/reclamation-stats-user.component';
import {HistoricalRoutingModule} from './historical-routing.module';
import {
    NbAccordionModule, NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbOptionModule, NbSelectModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HighchartsChartModule} from 'highcharts-angular';
import { ReclamationStatsSubCategoryComponent } from './reclamation-stats-sub-category/reclamation-stats-sub-category.component';



@NgModule({
  declarations: [
    HistoricalComponent,
    ReclamationStatsUserComponent,
    ReclamationStatsSubCategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    HistoricalRoutingModule,
    NbCardModule,
    NbAccordionModule,
    NbIconModule,
    TranslateModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    NbInputModule,
    NbOptionModule,
    NbSelectModule,
    FormsModule,
    NbButtonModule,
    HighchartsChartModule,
  ],
})
export class HistoricalModule { }
