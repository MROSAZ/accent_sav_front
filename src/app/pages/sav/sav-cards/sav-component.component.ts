import { Component, OnInit } from '@angular/core';
import {Cards, Client} from '../../../@core/data';
import {ModelCardService} from '../../../@core/service/model-card.service';
import {ClientService} from '../../../@core/service/client.service';
import {CardsService} from '../../../@core/service/cards.service';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SavComponentsComponent} from './sav-components/sav-components.component';

@Component({
  selector: 'ngx-sav-cards',
  templateUrl: './sav-cards.component.html',
  styleUrls: ['./sav-cards.component.scss'],
})
export class SavCardsComponent {
  selectedClient: Client;
  loading: Boolean = false;
  cards: Cards[] = [];
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    public modelCardsService: ModelCardService,
    public clientService: ClientService,
    public cardsService: CardsService,
    private tosatrService: TosatrService,
    private translateService: TranslateService,

  ) {
    this.prepareNg2SmartTable();
  }


  chooseClient(client: Client) {
    this.selectedClient = client;
  }
  getCardsByClient() {
    this.cardsService.getCardsByIdClient(this.selectedClient.id).subscribe(cards => {
      this.cards = cards;
      this.source.load(this.cards);
    });
  }
  prepareNg2SmartTable() {
    this.settings = {
      actions: {
        columnTitle: '', // minimize the actions column size
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        id: {
          title: 'ID',
          type: String,
          filter: true,
        },
        numSerie: {
          title: 'Numéro de série',
          type: 'string',
        },
        imei: {
          title: 'IMEI',
          type: 'string',
        },
        buyDate: {
          title: 'Etat',
          type: 'html',
          filter: false,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            // Get the buy date from the row
            const buyDate = new Date(cell);
            // Calculate the difference between buy date and current date in milliseconds
            const differenceInMilliseconds = Date.now() - buyDate.getTime();
            // Convert milliseconds to years
            const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
            // Check if the difference is less than 1 year
            if (differenceInYears < 1) {
              return '<p class="font-weight-bold" style="color: green">Sous Garantie</p>';
            } else {
              return '<p class="font-weight-bold" style="color: red">Hors Garantie</p>';
            }
          },
        },
        historique: {
          title: 'Opérations de maintenance',
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            if (!row) {
              return([]);
            }
          },
          renderComponent: SavComponentsComponent,
          onComponentInitFunction(instance2) {
            instance2.save.subscribe(data => {
              return;
            });
          },
          filter: false,
          edit: false,
        },
      },
    };
  }
}
