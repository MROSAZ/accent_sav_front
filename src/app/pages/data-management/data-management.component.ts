import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-data-management',
  template: `
  <router-outlet></router-outlet>
`,
})
export class DataManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
