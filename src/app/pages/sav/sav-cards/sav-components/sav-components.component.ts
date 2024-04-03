import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TosatrService} from '../../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {Cards, Components, ComponentsSav} from '../../../../@core/data';
import {ComponentService} from '../../../../@core/service/component.service';

@Component({
  selector: 'ngx-sav-components',
  templateUrl: './sav-components.component.html',
  styleUrls: ['./sav-components.component.scss'],
})
export class SavComponentsComponent implements OnInit {
  @Input() rowData: Cards;
  @Output() save: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  component: Components[];
  componentSav: ComponentsSav[] = [];
  constructor(
    private modalService: NgbModal,
    private componentService: ComponentService,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
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
  open(content: any) {
    this.componentSav = [];
    this.componentService.findComponentByIdModel(this.rowData.cardModel.id).subscribe(
      component => {
        component.forEach(comp => {
          this.componentSav.push({'component': comp, 'quantity': 0});
        });
      });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.modalService.dismissAll();
  }

}
