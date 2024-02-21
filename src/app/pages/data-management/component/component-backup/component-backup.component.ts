import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Components } from '../../../../@core/data';
import {TosatrService} from '../../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentBuckupService} from '../../../../@core/service/component-buckup.service';
import {ComponentService} from '../../../../@core/service/component.service';

@Component({
  selector: 'ngx-component-backup',
  templateUrl: './component-backup.component.html',
  styleUrls: ['./component-backup.component.scss'],
})
export class ComponentBackupComponent implements OnInit {
  @Input() rowData: Components;
  @Output() save: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  showAddForm: boolean = false;
  reference: string;
  value: number;
  constructor(
    public componentService: ComponentService,
    public componentBuckupService: ComponentBuckupService,
    private modalService: NgbModal,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
  }

  open(content: any) {
    console.log(this.rowData);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    // Reset form fields when toggling visibility
  }

  addReference() {
    const newComponent: any = {
      'reference': this.reference,
      'value': this.value,
      'category': this.rowData.category,
      'backupRef': this.rowData,
    };
    this.componentBuckupService.add(newComponent).subscribe(res => {
      this.componentService.components.find(component => this.rowData.id === component.id).backupRef.push(res);
      this.tosatrService.showToast('success', this.translateService.instant('response.addSuccess'), '');
    });
  }
}
