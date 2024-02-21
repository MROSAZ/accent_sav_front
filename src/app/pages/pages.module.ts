import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DataManagementComponent } from './data-management/data-management.component';
import { TableDynamicComponent } from './table-dynamic/table-dynamic.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        MiscellaneousModule,
        ReactiveFormsModule,
    ],
  declarations: [
    PagesComponent,
    DataManagementComponent,
    TableDynamicComponent,
  ],
  exports: [
    TableDynamicComponent,
  ],
})
export class PagesModule {
}
