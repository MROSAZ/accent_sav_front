import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentService} from '../../../@core/service/component.service';
import {CategoriesService} from '../../../@core/service/categories.service';
import {ComponentBackupComponent} from './component-backup/component-backup.component';

@Component({
  selector: 'ngx-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings: any;
  categories: any[] = [];

  constructor(
    public componentService: ComponentService,
    private categoriesService: CategoriesService,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
  ) {
    this.prepareEditorData();
    this.prepareNg2SmartTableComponents();
  }

  ngOnInit(): void {
  }
  prepareEditorData() {
    this.categoriesService.categories.forEach(categorie => {
      this.categories.push({
        value: categorie.id,
        title: categorie.category,
      });
    });
  }
  prepareNg2SmartTableComponents() {
    this.source.load(this.componentService.components);

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
        reference: {
          title: 'Réference',
          type: String,
          filter: true,
        },
        value: {
          title: 'Valeur',
          type: Number,
          filter: true,
          valuePrepareFunction: (cell, row) => {
            return (cell + ' ' + row.category.measurementUnit);
          },
        },
        quantity: {
          title: 'Quantity',
          type: Number,
          filter: true,
          valuePrepareFunction: (cell, row) => {
            return (cell + ' ' + 'pieces');
          },
        },
        // backup: {
        //   title: 'BackUp',
        //   type: Boolean,
        //   filter: true,
        //   editor: {
        //     type: 'list',
        //     config: {
        //       list: [{value: false, title: 'false'}, {value: true, title: 'true'}],
        //     },
        //   },
        // },
        category: {
          title: 'Category',
          type: Number,
          filter: true,
          valuePrepareFunction: (cell, row) => {
            return (cell.category);
          },
          editor: {
            type: 'list',
            config: {
              list: this.categories,
            },
          },
        },
        backup_references: {
          title: 'Autre Reference',
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            if (!row.backupRef) {
              return([]);
            }
          },
          renderComponent: ComponentBackupComponent,
          onComponentInitFunction(instance2) {
            instance2.save.subscribe(data => {
              return;
            });
          },
          filter: false,
          editable: false,
        },
      },
    };
  }

  onDeleteConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.deleteDemand') + ' ?')) {
      this.componentService.delete(event.data.id).subscribe(
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
        'reference': event.newData.reference,
        'value': event.newData.value,
        'quantity': event.newData.quantity,
        'category': this.categoriesService.categories.find(categorie => event.newData.category = categorie.id),
        'backupRef': null,
      };
      this.componentService.add(event.newData).subscribe(
        res => {
          event.confirm.resolve(res);
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
        'id': event.newData.id,
        'reference': event.newData.reference,
        'value': event.newData.value,
        'quantity': event.newData.quantity,
        'category': this.categoriesService.categories.find(categorie => event.newData.category = categorie.id),
        'backupRef': this.componentService.components.find(component => event.newData.id = component.id).backupRef,
      };
      this.componentService.update(event.newData).subscribe(
        res => {
          event.confirm.resolve(res);
          this.tosatrService.showToast('success', this.translateService.instant('response.updateSuccess'), '');
        },
      );
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.updateError'), '');
    }
  }

}
