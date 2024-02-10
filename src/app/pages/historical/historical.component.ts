import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-historical',
  template: `
  <router-outlet></router-outlet>
`,
})
export class HistoricalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
