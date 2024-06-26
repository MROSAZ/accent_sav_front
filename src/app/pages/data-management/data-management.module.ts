import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import {NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthorityComponent } from './authority/authority.component';
import { NotificationComponent } from '../notification/notification.component';
import { AdminComponent } from './admin/admin.component';
import {TranslateModule} from '@ngx-translate/core';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { CategoriesComponent } from './categories/categories.component';
import {PagesModule} from '../pages.module';
import { ComponentComponent } from './component/component.component';
import { ComponentBackupComponent } from './component/component-backup/component-backup.component';
import {FormsModule} from '@angular/forms';
import { ClientComponent } from './client/client.component';
import { ModelCardComponent } from './model-card/model-card.component';
import { ModelComponentComponent } from './model-card/model-component/model-component.component';
import {DataManagementComponent} from './data-management.component';

@NgModule({
  declarations: [
    DataManagementComponent,
    AuthorityComponent,
    NotificationComponent,
    AdminComponent,
    CategoriesComponent,
    ComponentComponent,
    ComponentBackupComponent,
    ClientComponent,
    ModelCardComponent,
    ModelComponentComponent,
  ],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule,
    TranslateModule,
    NbLayoutModule,
    AngularEditorModule,
    NbIconModule,
    PagesModule,
    FormsModule,
  ],
})
export class DataManagementModule { }
