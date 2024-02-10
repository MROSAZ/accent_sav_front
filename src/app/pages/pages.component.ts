import {Component, OnDestroy, OnInit} from '@angular/core';
import { MenuItemsService } from '../@core/service/menu-items.service';
import { NbMenuItem } from '@nebular/theme';
import {Subscription} from 'rxjs';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  menu: NbMenuItem[] = [];
  private alive: boolean = true;
  private langChangeSubscription: Subscription;
  constructor(
    private menuItemsService: MenuItemsService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.menuItemsService.updateMenuItems().then(menuItems => {
      this.menu = menuItems;
    });

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.menuItemsService.updateMenuItems().then(menuItems => {
          this.menu = menuItems;
        });

      },
    );
  }
  ngOnDestroy(): void {
    this.alive = false;
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
