import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-table-dynamic',
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.scss'],
})
export class TableDynamicComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() service: any;
  constructor() { }

  ngOnInit(): void {
  }

}
