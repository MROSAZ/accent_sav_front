import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DataManagementService} from '../../../@core/service/data-management.service';
import {UserService} from '../../../@core/service/user.service';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {DatePipe} from '@angular/common';
import {AuthoritiesService} from '../../../@core/service/authorities.service';
import {takeWhile} from 'rxjs/operators';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private langChangeSubscription: Subscription;
  private alive: boolean = true;
  loading: Boolean;
  source: LocalDataSource = new LocalDataSource();
  settings: any;
  authorities: any[] = [];

  constructor(
    public dataManagementService: DataManagementService,
    public userService: UserService,
    private tosatrService: TosatrService,
    private datePipe: DatePipe,
    private authoritiesService: AuthoritiesService,
    private translateService: TranslateService, // Inject the MessageService
  ) {
    this.prepareNg2SmartTableUser();
  }

  ngOnDestroy(): void {
    this.alive = false;
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }


  ngOnInit(): void {
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.prepareNg2SmartTableUser();
      },
    );
    this.dataManagementService.DataLoaded$.pipe(
      takeWhile(() => this.alive)).subscribe(
      res => {
        this.authoritiesService.findAllAuthoritiesService().subscribe(authorities => {
          for (let i = 0; i < authorities.length - 4; i++) {
            this.authorities.push({
              value: authorities[i].id,
              title: authorities[i].name,
            });
          }
          this.source.load(this.userService.users.filter(user => user.authorities[0].label === 'admin'));
          this.prepareNg2SmartTableUser();
        });
      });
    if (!this.dataManagementService.checkDataLoaded()) {
      this.dataManagementService.loadData();
    }
  }

  prepareNg2SmartTableUser() {
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
        // username: {
        //   title: 'Username',
        //   type: String,
        //   filter: true,
        // },
        name: {
          title: 'Name',
          type: String,
          filter: true,
        },
        email: {
          title: 'Email',
          type: 'string',
        },
        rawPassword: {
          title: 'Pasword',
          type: 'string',
        },
        createdBy: {
          title: 'Created By',
          type: 'number',
        },
        createdDate: {
          title: 'Created Date',
          type: 'date',
          filter: true,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            return this.formatDate(cell); // Modify the value here
          },
        },
        modifiedBy: {
          title: 'Modified By',
          type: 'number',
        },
        modifiedDate: {
          title: 'Modified Date',
          type: 'date',
          filter: true,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            return this.formatDate(cell); // Modify the value here
          },
        },
        authorities: {
          title: 'Authority',
          type: 'string',
          valuePrepareFunction: (cell, row) => {
            return cell && cell[0] ? cell[0].name : ''; // Modify the value here
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Authorities',
              list: this.authorities,
            },
          },
        },
      },
    };
  }


  onDeleteConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.deleteDemand') + ' ?')) {
      this.userService.deleteUserService(event.data.id).subscribe(
        (data) => {
          event.confirm.resolve();
          this.tosatrService.showToast('success', this.translateService.instant('response.deleteSuccess'), '');
        });
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.deleteError'), '');
    }
  }


  onCreateConfirm(event): void {
    if (window.confirm(`${this.translateService.instant('response.addDemand')}  ${event.newData.firstname}?`)) {
      this.authoritiesService.findauthorityById(Number(event.newData.authorities)).subscribe(authorities => {
        let auth: any = [];
        auth.push(authorities);
        event.newData = {
          'name': event.newData.name,
          'username': event.newData.email.toLowerCase(),
          'rawPassword': event.newData.rawPassword,
          'email': event.newData.email.toLowerCase(),
          'createdBy': Number(localStorage.getItem('id')),
          'createdDate': Date.now(),
          'modifiedBy': Number(localStorage.getItem('id')),
          'modifiedDate': Date.now(),
          'authorities': auth,
        };

        this.userService.addUserService(event.newData).subscribe(
          res => {
            event.confirm.resolve(event.newData);
            this.tosatrService.showToast('success', this.translateService.instant('response.addSuccess'), '');
          },
        );
      });
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.addError'), '');
    }
  }

  onSaveConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.updateDemand'))) {
      this.authoritiesService.findauthorityById(Number(event.newData.authorities)).subscribe(authorities => {
        let auth: any[] = [];
        auth.push(authorities);
        event.newData = {
          'id': event.newData.id,
          'name': event.newData.name,
          'username': event.newData.email.toLowerCase(),
          'rawPassword': event.newData.rawPassword,
          'email': event.newData.email.toLowerCase(),
          'createdBy': event.newData.createdBy,
          'createdDate': event.newData.createdDate,
          'modifiedBy': Number(localStorage.getItem('id')),
          'modifiedDate': Date.now(),
          'authorities': auth,
        };
        this.userService.updateUserService(event.newData).subscribe(
          res => {
            event.confirm.resolve(event.newData);
            this.tosatrService.showToast('success', this.translateService.instant('response.updateSuccess'), '');
          },
        );
      });
    } else {
      event.confirm.reject();
      this.tosatrService.showToast('danger', this.translateService.instant('response.updateError'), '');
    }
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'medium');
  }

}
