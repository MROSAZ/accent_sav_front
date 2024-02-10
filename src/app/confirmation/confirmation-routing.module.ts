import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {ConfirmationContainerComponent} from './confirmation-container.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationContainerComponent,
    children: [
      {
        path: ':token',
        component: ConfirmationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationRoutingModule {
}
