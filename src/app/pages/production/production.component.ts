import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-production',
  template: `
  <router-outlet></router-outlet>
`,
})
export class ProductionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
