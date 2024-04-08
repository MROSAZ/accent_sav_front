import { NgModule } from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule, NbProgressBarModule, NbAccordionModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {TranslateModule} from '@ngx-translate/core';
import {HighchartsChartModule} from 'highcharts-angular';


@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NgxEchartsModule,
        ChartModule,
        LeafletModule.forRoot(),
        TranslateModule,
        NbProgressBarModule,
        HighchartsChartModule,
        NbAccordionModule,
    ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
  ],
})
export class DashboardModule { }
