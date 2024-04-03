import { Component, OnInit } from '@angular/core';
import {CardModel, Cards, Client} from '../../../@core/data';
import {ModelCardService} from '../../../@core/service/model-card.service';
import {ClientService} from '../../../@core/service/client.service';
import {CardsService} from '../../../@core/service/cards.service';
import {TosatrService} from '../../../@core/service/tosatr.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-cards-vente',
  templateUrl: './cards-vente.component.html',
  styleUrls: ['./cards-vente.component.scss'],
})
export class CardsVenteComponent implements OnInit {

  formExpanded: boolean = true;
  selectedModel: CardModel;
  selectedClient: Client;
  selectedCards: Cards[] = [];
  cards: Cards[] = [];
  cardsSearch: Cards[] = [];
  searchValue = '';

  constructor(
    public modelCardsService: ModelCardService,
    public clientService: ClientService,
    public cardsService: CardsService,
    private tosatrService: TosatrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
  }
  chooseModel(model: CardModel) {
    this.selectedModel = model;
    this.cards = this.cardsService.cards.filter(card =>
      card.cardModel.model === this.selectedModel.model && card.buyDate === null);
    this.cardsSearch = this.cardsService.cards.filter(card =>
      card.cardModel.model === this.selectedModel.model && card.buyDate === null);
  }
  chooseClient(client: Client) {
    this.selectedClient = client;
  }
  addCards() {
    this.selectedCards.forEach(card => {
      card.client = this.selectedClient;
      card.buyDate = new Date();
    });
    this.cardsService.update(this.selectedCards).subscribe( cards => {
        this.tosatrService.showToast('success', this.translateService.instant('response.updateSuccess'), '');

      });
  }
  searchCards() {
    this.cardsSearch = this.cards.filter(card => card.numSerie.includes(this.searchValue));

  }
  onSelectedCardsChange(selectedCards: any) {
    this.selectedCards = selectedCards;
  }

}
