import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-table-dynamic',
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.scss'],
})
export class TableDynamicComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() config: any;
  @Input() create: (args: any) => any;
  @Input() delete: (args: any) => boolean;
  @Input() update: (args: any) => any;
  constructor() {}
  ngOnInit(): void {
    console.log(this.config);
  }

  protected readonly Object = Object;
}
