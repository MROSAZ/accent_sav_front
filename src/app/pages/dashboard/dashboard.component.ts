import {Component, OnInit} from '@angular/core';
import {DataManagementService} from '../../@core/service/data-management.service';
import {ComponentService} from '../../@core/service/component.service';
import {CardsService} from '../../@core/service/cards.service';
import {CardsStock, Components, ProdHistorique} from '../../@core/data';
import {ProductionService} from '../../@core/service/production.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  componentExpand: boolean = false;
  prodExpand: boolean = true;
  cardExpand: boolean = false;
  cardStock: CardsStock[] = [];
  productionHistorique: ProdHistorique[] = [];

  constructor(
    public dataManagementService: DataManagementService,
    public componentService: ComponentService,
    public prodService: ProductionService,
    public cardService: CardsService,
  ) {
  }

  ngOnInit() {
    if (!this.dataManagementService.checkDataLoaded()) {
      this.dataManagementService.loadData();
    }
    this.cardService.getCardStock().subscribe(cardStock => {
      this.cardStock = cardStock;
    });
    this.prodService.findAllHistorique().subscribe(prodHistorique => {
      this.productionHistorique = prodHistorique;
    });
  }

  getDisplay(quantity: number): string {
    if (quantity > 10) {
      return 'd-none'; // Background red
    }
  }

  getQuantityExistance(components: Components[]): boolean {
    this.componentExpand = true;
    return components.some(component => component.quantity < 11);
  }
  getStockExistance(cardStock: CardsStock[]): boolean {
    this.cardExpand = true;
    return cardStock.some(stock => stock.stock < 11);
  }
}
