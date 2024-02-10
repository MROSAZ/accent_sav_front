import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-confirmation',
  template: `
    <ngx-one-column-footer-layout>
      <router-outlet></router-outlet>
    </ngx-one-column-footer-layout>  `,
 styleUrls: ['./confirmation-container.component.scss'],
})
export class ConfirmationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
