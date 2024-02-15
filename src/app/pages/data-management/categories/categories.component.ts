import { Component, OnInit } from '@angular/core';
import {DataManagementService} from "../../../@core/service/data-management.service";
import {CategoriesService} from "../../../@core/service/categories.service";

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  columns: string[] = ['id', 'category', 'measurementUnit']; // Define your column names
  constructor(
    public dataManagementService: DataManagementService,
    public categoryService: CategoriesService,
  ) {}

  ngOnInit(): void {
  }

}
