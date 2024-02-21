import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from './user.service';
import {CategoriesService} from './categories.service';
import {AuthoritiesService} from './authorities.service';
import {ComponentService} from './component.service';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {

  public DataLoaded$: EventEmitter<any> = new EventEmitter();
  componentName: string;

  constructor(
    private userService: UserService,
    private categoryService: CategoriesService,
    private authoritiesService: AuthoritiesService,
    private componentService: ComponentService,
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
    this.userService.UserLoaded$.subscribe(res => {
      this.checkDataLoaded();
    });
  }
}
