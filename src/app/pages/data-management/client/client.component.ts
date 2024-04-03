import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../@core/service/client.service';
import {LocalDataSource} from 'ng2-smart-table';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  settings: any;
  constructor(
    private tosatrService: TosatrService,
    private translateService: TranslateService,
    public clientService: ClientService,
  ) {
    this.prepareNg2SmartTableClients();

  }

  ngOnInit(): void {
  }
  prepareNg2SmartTableClients() {
    this.source.load(this.clientService.clients);

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
        email: {
          title: 'Email',
          type: String,
          filter: true,
        },
        name: {
          title: 'Name',
          type: String,
        },
      },
    };
  }

  onDeleteConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.deleteDemand') + ' ?')) {
      this.clientService.delete(event.data.id).subscribe(
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
        'name': event.newData.name,
        'email': event.newData.email,
      };

      this.clientService.add(event.newData).subscribe(
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
        'name': event.newData.name,
        'email': event.newData.email,
      };
      this.clientService.update(event.newData).subscribe(
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
