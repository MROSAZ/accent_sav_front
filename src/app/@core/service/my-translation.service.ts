import {EventEmitter, Injectable} from '@angular/core';
import {MenuItemsService} from './menu-items.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslationService {
  public translate$: EventEmitter<void> = new EventEmitter();
  constructor(
    private menuService: MenuItemsService,
    private translateService: TranslateService,
  ) { }


  translateMenu() {
    const translationKeys = this.menuService.menuItems
      .map(item => 'MENU.' + item.data)
      .concat(
        this.menuService.menuItems.reduce((acc, item) => {
          if (item.children) {
            acc.push(...item.children.map(child => 'MENU.' + child.title));
          }
          console.log(item);
          return acc;
        }, []),
      );


    this.translateService.get(translationKeys)
      .subscribe(translations => {
        this.menuService.menuItems.forEach(item => {
          if (item.data) {
            item.title = translations['MENU.' + item.data];
          }

          if (item.children) {
            item.children.forEach(child => {
              if (child.title) {
                child.title = translations['MENU.' + child.title];
              }
            });
          }
        });
      });
  }
}
