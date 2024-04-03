import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ComponentService} from '../../../../@core/service/component.service';
import {ModelComponentService} from '../../../../@core/service/model-component.service';
import {TosatrService} from '../../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {Components, ModelComponent} from '../../../../@core/data';

@Component({
  selector: 'ngx-model-component',
  templateUrl: './model-component.component.html',
  styleUrls: ['./model-component.component.scss'],
})
export class ModelComponentComponent implements OnInit {
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  showDeleteForm: boolean = false;
  loading: boolean = false;
  quantity: number = 0;
  selectedItem: number = 0;
  selectedComponent: number = 0;
  modelComponent: ModelComponent;
  modelComponents: ModelComponent[];
  constructor(
    private modalService: NgbModal,
    public modelComponentService: ModelComponentService,
    public compoenntService: ComponentService,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.modelComponents = this.modelComponentService.modelComponents.filter(modelComp =>
      modelComp.cardModel.id === this.rowData.id);
  }
  open(content: any) {
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
    if (this.showUpdateForm || this.showDeleteForm) {
      this.showDeleteForm = false;
      this.showUpdateForm = false;
    }
    this.showAddForm = !this.showAddForm;
    // Reset form fields when toggling visibility
  }

  toggleUpdateForm(modelComponent: ModelComponent) {
    if (this.showAddForm || this.showDeleteForm) {
      this.showAddForm = false;
      this.showDeleteForm = false;
    }
    this.showUpdateForm = true;
    if (modelComponent !== this.modelComponent) {
      this.selectedItem = modelComponent.id;
      this.modelComponent = modelComponent;
    } else {
      this.selectedItem = modelComponent.id;
      this.modelComponent = modelComponent;
    }
  }
  toggleDeleteForm(modelComponent: ModelComponent) {
    if (this.showAddForm || this.showUpdateForm) {
      this.showAddForm = false;
      this.showUpdateForm = false;
    }
    this.showDeleteForm = true;
    if (modelComponent !== this.modelComponent) {
      this.modelComponent = modelComponent;
    }
  }

  addModelComposant() {
    const modelComponent: any = {
      'cardModel': this.rowData,
      'component': this.compoenntService.components.find(component => component.id === Number(this.selectedItem)),
      // 'component': this.compoenntService.components.find(component => component.id = this.selectedComponent),
      'quantity': this.quantity,
    };
    this.modelComponentService.add(modelComponent).subscribe(res => {
      this.modelComponents.push(res);
      this.tosatrService.showToast('success', this.translateService.instant('response.addSuccess'), '');
      this.quantity = 0;
      this.selectedItem = 0;
      this.showAddForm = false;
    });
  }
  cancelAdd() {
      this.quantity = 0;
      this.selectedItem = 0;
      this.showAddForm = false;
  }
  cancelUpdate() {
      this.showUpdateForm = false;
  }

  cancelDelete() {
      this.showDeleteForm = false;
  }

  update() {
    this.modelComponentService.update(
      {
        'id': this.modelComponent.id,
        'cardModel': this.rowData,
        'component': this.modelComponent.component,
        'quantity': this.quantity,
      }).subscribe(res => {
      this.quantity = 0;
      this.selectedItem = 0;
      this.showUpdateForm = false;
      const index = this.modelComponentService.modelComponents.findIndex(component => component.id === res.id);
      if (index !== -1) {
        this.modelComponentService.modelComponents[index] = res;
      }
      this.tosatrService.showToast('success', this.translateService.instant('response.addSuccess'), '');
    });
  }

  delete() {
    this.modelComponentService.delete(this.modelComponent.id).subscribe(res => {
      if (res) {
        alert('supprimer avec succes');
        const index = this.modelComponents.findIndex(
          component => component.id === this.modelComponent.id);
        if (index !== -1) {
          // Remove the component from the array
          this.modelComponents.splice(index, 1);
          // this.loading = false;
      }
    } else {
        alert('error au cours de suppression');
      }
    });
  }
}
