import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../../@core/service/categories.service';
import {LocalDataSource} from 'ng2-smart-table';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings: any;
  constructor(
    public categoryService: CategoriesService,
    private tosatrService: TosatrService,
    private translateService: TranslateService, // Inject the MessageService
  ) {
    this.prepareNg2SmartTableCategories();
  }

  ngOnInit(): void {
  }

  prepareNg2SmartTableCategories() {
    this.source.load(this.categoryService.categories);

    this.settings = {
      actions: {
        columnTitle: '', // minimize the actions column size
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        id: {
          title: 'ID',
          type: String,
          filter: true,
          editable: false,
          addable: false,
        },
        category: {
          title: 'Category',
          type: String,
          filter: true,
        },
        measurementUnit: {
          title: 'Unité de mesure',
          type: String,
        },
      },
    };
  }
  onDeleteConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.deleteDemand') + ' ?')) {
      this.categoryService.delete(event.data.id).subscribe(
        (data) => {
          event.confirm.resolve();
          this.tosatrService.showToast('success', this.translateService.instant('response.deleteSuccess'), '');
        });
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.deleteError'), '');
    // }
  }
  }


  onCreateConfirm(event): void {
    if (window.confirm(`${this.translateService.instant('response.addDemand')} ${event.newData.firstname}?`)) {
      event.newData = {
        'category': event.newData.category,
        'measurementUnit': event.newData.measurementUnit,
      };

      this.categoryService.add(event.newData).subscribe(
        res => {
          event.confirm.resolve(res);
          // this.categoryService.categories.push(res);
          this.tosatrService.showToast('success', this.translateService.instant('response.addSuccess'), '');
        },
      );
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.addError'), '');
    }
  }

  onSaveConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.updateDemand'))) {
      event.newData = {
        'id': Number(event.newData.id),
        'category': event.newData.category,
        'measurementUnit': event.newData.measurementUnit,
      };
      this.categoryService.update(event.newData).subscribe(
        res => {
          event.confirm.resolve(event.newData);
          this.tosatrService.showToast('success', this.translateService.instant('response.updateSuccess'), '');
        },
      );
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.updateError'), '');
    }
  }

}
