import { Component, OnInit } from '@angular/core';
import {ModelCardService} from '../../../@core/service/model-card.service';
import {LocalDataSource} from 'ng2-smart-table';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {ModelComponentComponent} from './model-component/model-component.component';

@Component({
  selector: 'ngx-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss'],
})
export class ModelCardComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  settings: any;

  constructor(
    public modelCardService: ModelCardService,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
  ) {
    this.prepareNg2SmartTableModel();
  }

  ngOnInit(): void {
  }
  prepareNg2SmartTableModel() {
    this.source.load(this.modelCardService.models);
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
        model: {
          title: 'Model',
          type: String,
          filter: true,
        },
        modelComponent: {
          title: 'Component Liste',
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
          },
          renderComponent: ModelComponentComponent,
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
      this.modelCardService.delete(event.data.id).subscribe(
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
        'model': event.newData.model,
      };

      this.modelCardService.add(event.newData).subscribe(
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
        'id': Number(event.newData.id),
        'model': event.newData.model,
      };
      this.modelCardService.update(event.newData).subscribe(
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

