import { Component, OnInit } from '@angular/core';
import { ModelCardService } from '../../../@core/service/model-card.service';
import {CardModel, Cards, CardsAddDto, CardsStock} from '../../../@core/data';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import {CardsService} from '../../../@core/service/cards.service';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-cards-vente',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  formExpanded: boolean = true;
  selectedModel: CardModel;
  cardStock: CardsStock[] = [];
  filePreview: any[];
  fileControl = new FormControl();
  missingFields: string[]; // Declare missingFields here
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    public modelCardsService: ModelCardService,
    public cardService: CardsService,
    public datePipe: DatePipe,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
    ) {
    this.prepareNg2SmartTableCards();
    this.cardService.getCardStock().subscribe(stock => {
      this.cardStock = stock;
    });
  }

  ngOnInit(): void {
  }
  prepareNg2SmartTableCards() {
    this.source.load(this.cardService.cards.filter(card => card.buyDate === null));
    this.settings = {
      actions: {
        delete: false,
        addable: false,
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
        imei: {
          title: 'IMEI',
          type: String,
          filter: true,
        },
        numSerie: {
          title: 'Numéro de série',
          type: String,
        },
        addDate: {
          title: 'Date d"ajout au stock',
          type: String,
          valuePrepareFunction: (cell, row) => {
            return this.datePipe.transform(cell); // Modify the value here
          },
          filter: true,
          editable: false,
          addable: false,
        },
      },
    };
  }
  onSaveConfirm(event): void {
    if (window.confirm(this.translateService.instant('response.updateDemand'))) {
      event.newData = {
        'id': Number(event.newData.id),
        'imei': event.newData.category,
        'numSerie': event.newData.measurementUnit,
        'addDate': event.newData.addDate,
        'cardModel': event.newData.cardModel,
      };
      this.cardService.update(event.newData).subscribe(
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

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.filePreview = null; // Reset filePreview
    this.missingFields = null; // Reset missingFields
    this.readExcel(file);
  }

  chooseModel(model: CardModel) {
    this.selectedModel = model;
  }

  readExcel(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

      /* grab first sheet */
      const worksheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];

      /* extract data */
      this.filePreview = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      /* Check if all required fields are present */
      const requiredFields = ['IMEI', 'Numero de serie']; // Modify as per your actual required fields
      this.missingFields = requiredFields.filter(field => !Object.keys(this.filePreview[0]).includes(field));

      if (this.missingFields.length > 0) {
        console.warn('The uploaded file does not fit the required form. Missing fields:',
          this.missingFields.join(', '));
        // You can display this warning to the user in your UI
      }
    };
    reader.readAsBinaryString(file);
  }

  addCards() {
    let cardsAddDto = new CardsAddDto();
    cardsAddDto.cardModel = this.selectedModel;
    cardsAddDto.cards = [];
    for (let i = 0; i < this.filePreview.length; i++) {
      let card = new Cards();
      // Set IMEI and NumSerie from filePreview
      card.imei = this.filePreview[i]['IMEI'];
      card.numSerie = this.filePreview[i]['Numero de serie'];
      cardsAddDto.cards.push(card);
    }
    this.cardService.add(cardsAddDto).subscribe(
      cards => {
        this.cardService.cards.push(cards);
        this.tosatrService.showToast('success', this.translateService.instant('response.addSuccess'), '');
      },
      // Error callback
      error => {
        this.tosatrService.showToast('danger', this.translateService.instant('response.addError'), '');
      });
  }
}
