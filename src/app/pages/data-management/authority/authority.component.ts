import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {AuthoritiesService} from '../../../@core/service/authorities.service';
import {Authorities} from '../../../@core/data';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss'],
})
export class AuthorityComponent implements OnInit, OnDestroy {
  private langChangeSubscription: Subscription;
  private alive: boolean = true;
  source: LocalDataSource = new LocalDataSource();
  authorities: Authorities[] = [];

  settings: any;
  constructor(
    public authoritiesService: AuthoritiesService,
    private tosatrService: TosatrService,
    private translateService: TranslateService, // Inject the MessageService
  ) {
    this.prepareNg2SmartTableCategories();
  }
  ngOnDestroy(): void {
    this.alive = false;
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.prepareNg2SmartTableCategories();
      },
    );
   this.authoritiesService.findAllAuthoritiesService().subscribe(authorities => {
     this.authorities = authorities;
     this.prepareNg2SmartTableCategories();
   });
  }
  prepareNg2SmartTableCategories() {
    this.source.load(this.authorities);

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
        },
        name: {
          title: 'Category',
          type: String,
          filter: true,
        },
        label: {
            title: 'Label',
          type: 'string',
        },
      },
    };
  }


  onDeleteConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.deleteDemand') + ' ?')) {
      this.authoritiesService.deleteAuthorityService(event.data.id).subscribe(
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
    if (window.confirm(`${this.translateService.instant('response.addDemand')} ${event.newData.firstname}?`)) {
      event.newData = {
        'name': event.newData.name,
        'label': event.newData.label,
      };

      this.authoritiesService.addAuthorityService(event.newData).subscribe(
        res => {
          event.confirm.resolve(event.newData);
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
        'name': event.newData.name,
        'label': event.newData.label,
      };
      this.authoritiesService.updateAuthorityService(event.newData).subscribe(
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
