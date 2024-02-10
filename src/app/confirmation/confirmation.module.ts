import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {ConfirmationRoutingModule} from './confirmation-routing.module';
import {ConfirmationContainerComponent} from './confirmation-container.component';
import {ThemeModule} from "../@theme/theme.module";
import {NbCardModule} from "@nebular/theme";



@NgModule({
  declarations: [
    ConfirmationComponent,
    ConfirmationContainerComponent,
  ],
  imports: [
    CommonModule,
    ConfirmationRoutingModule,
    ThemeModule,
    NbCardModule,
  ],
})
export class ConfirmationModule { }
