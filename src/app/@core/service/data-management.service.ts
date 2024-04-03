import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from './user.service';
import {CategoriesService} from './categories.service';
import {AuthoritiesService} from './authorities.service';
import {ComponentService} from './component.service';
import {ClientService} from './client.service';
import {ModelCardService} from './model-card.service';
import {ModelComponentService} from './model-component.service';
import {CardsService} from './cards.service';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {

  public DataLoaded$: EventEmitter<any> = new EventEmitter();
  componentName: string;

  constructor(
    private userService: UserService,
    private categoryService: CategoriesService,
    private cardsService: CardsService,
    private authoritiesService: AuthoritiesService,
    private componentService: ComponentService,
    private modelComponentService: ModelComponentService,
    private clientService: ClientService,
    private modelCardService: ModelCardService,
  ) {

  }
  checkDataLoaded(): boolean {
    if (this.userService.users) {
      this.DataLoaded$.emit();
      return true;
    }
    return false;
  }


  loadData() {
    this.userService.loadAllUsers();
    this.categoryService.loadAllCategories();
    this.authoritiesService.loadAllAuthorities();
    this.componentService.loadAllComponents();
    this.clientService.loadAllClients();
    this.cardsService.loadAllCards();
    this.modelCardService.loadAllCarModel();
    this.modelComponentService.loadAllModelComponents();
    this.userService.UserLoaded$.subscribe(res => {
      this.checkDataLoaded();
    });
  }
}
