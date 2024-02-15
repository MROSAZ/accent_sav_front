import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import {NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthorityComponent } from './authority/authority.component';
import {FormsModule} from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { AdminComponent } from './admin/admin.component';
import {TranslateModule} from '@ngx-translate/core';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { CategoriesComponent } from './categories/categories.component';
import {PagesModule} from '../pages.module';

@NgModule({
  declarations: [
    AuthorityComponent,
    NotificationComponent,
    AdminComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule,
    FormsModule,
    TranslateModule,
    NbLayoutModule,
    AngularEditorModule,
    NbIconModule,
    PagesModule,
  ],
})
export class DataManagementModule { }
