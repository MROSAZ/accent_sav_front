import { Injectable } from '@angular/core';
import { MENU_ITEMS } from '../../pages/pages-menu';
import { NbMenuItem } from '@nebular/theme';
import { UserService } from './user.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {

  constructor(private userService: UserService,
              private translateService: TranslateService) {}

  public menuItems: NbMenuItem[] = [];
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isNewsManager: boolean = false;
  isDataManager: boolean = false;

  // Method to update menu items based on user authorities
  async updateMenuItems(): Promise<NbMenuItem[]> {
    // Check if the user is an admin
    const user = await this.userService.findUserById(Number(localStorage.getItem('id'))).toPromise();
    this.isAdmin = user.authorities[0].label === 'admin';
    this.isSuperAdmin = user.authorities[0].label === 'superAdmin';
    this.isNewsManager = user.authorities[0].label === 'newsManager';
    this.isDataManager = user.authorities[0].label === 'dataManager';

    // If the user is an admin, return all menu items; otherwise, create a new menu with limited items
    if (this.isAdmin) {
      this.menuItems =
        [
          {
            title: this.translateService.instant('MENU.stat'),
            icon: 'activity-outline',
            link: '/pages/dashboard',
            home: true,
          },
          {
            title: this.translateService.instant('MENU.historical'),
            icon: 'bar-chart',
            children: [
              {
                title: this.translateService.instant('MENU.historicalservice'),
                link: '/pages/historical/reclamations',
              },
              {
                title: this.translateService.instant('MENU.historicalservicesubcategory'),
                link: '/pages/historical/reclamations-per-categories',
              },
            ],
          },
          {
            title: this.translateService.instant('MENU.management'),
            icon: 'file-text-outline',
            children: [
              {
                title: this.translateService.instant('MENU.administration'),
                link: '/pages/data/user',
              },
              {
                title: this.translateService.instant('MENU.citoyen'),
                link: '/pages/data/citoyen',
              },
              {
                title: 'Authorities',
                link: '/pages/data/authorities',
              },
              {
                title: this.translateService.instant('MENU.reclamations'),
                link: '/pages/data/reclamations',
              },
              {
                title: this.translateService.instant('MENU.categories'),
                link: '/pages/data/categories',
              },
              {
                title: this.translateService.instant('MENU.sub-categories'),
                link: '/pages/data/sous-category',
              },
              {
                title: this.translateService.instant('MENU.title-suggestion'),
                link: '/pages/data/title-suggestion',
              },
              {
                title: this.translateService.instant('MENU.region'),
                link: '/pages/data/region',
              },
            ],
          },
        ];
    } else if (this.isSuperAdmin) {
      this.menuItems = [
      {
        title: this.translateService.instant('MENU.stat'),
        icon: 'activity-outline',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: this.translateService.instant('MENU.management'),
        icon: 'file-text-outline',
        children: [
          {
            title: this.translateService.instant('MENU.admin'),
            link: '/pages/data/admin',
          },
        ],
      },
    ];
    } else if (this.isNewsManager) {
      this.menuItems = [
      {
        title: this.translateService.instant('MENU.stat'),
        icon: 'activity-outline',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: this.translateService.instant('MENU.management'),
        icon: 'file-text-outline',
        children: [
          {
            title: this.translateService.instant('MENU.news'),
            link: '/pages/data/news',
          },
        ],
      },
    ];
    } else  if (this.isDataManager) {
      this.menuItems = [
        {
          title: this.translateService.instant('MENU.management'),
          icon: 'file-text-outline',
          children: [
            {
        title: this.translateService.instant('MENU.categories'),
          link: '/pages/data/categories',
      },
      {
        title: this.translateService.instant('MENU.sub-categories'),
          link: '/pages/data/sous-category',
      },
      {
        title: this.translateService.instant('MENU.title-suggestion'),
          link: '/pages/data/title-suggestion',
      },
      {
        title: this.translateService.instant('MENU.region'),
          link: '/pages/data/region',
      },
          ],
        },
    ];
    } else {
      this.menuItems = [
        {
          title: this.translateService.instant('MENU.stat'),
          icon: 'activity-outline',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: this.translateService.instant('MENU.management'),
          icon: 'file-text-outline',
          children: [
            {
              title: this.translateService.instant('MENU.reclamations'),
              link: '/pages/data/reclamations',
            },
          ],
        },
      ];
    }

    return this.menuItems;
  }
}
