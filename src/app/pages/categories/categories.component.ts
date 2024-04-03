import { Component, OnInit } from '@angular/core';
import {DataManagementService} from "../../../@core/service/data-management.service";
import {CategoriesService} from '../../../@core/service/categories.service';

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  config: any;
  constructor(
    public dataManagementService: DataManagementService,
    public categoryService: CategoriesService,
  ) {
    this.config = {
      actions: {
        columnTitle: '', // minimize the actions column size
        add: true,
        delete: true,
        update: true,
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="fa-regular fa-pen-to-square"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="fa-regular fa-trash-can"></i>',
        confirmDelete: true,
      },
      columns: {
        id: {
          title: 'ID',
          type: 'string',
          filter: true,
        },
        category: {
          title: 'Category',
          type: 'string',
        },
        measurementUnit: {
          title: 'Unité de mésure',
          type: 'string',
        },
    },
  };
  }

  ngOnInit(): void {
  }
}
