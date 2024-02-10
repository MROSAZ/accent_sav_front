import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbLayoutDirection, NbLayoutDirectionService,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataManagementService } from '../../../@core/service/data-management.service';
import {NotificationsService} from '../../../@core/service/notifications.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  selectedLanguage: string = undefined;
  unreadNotificationsCount: number = 0; // Update this value based on your actual unread notifications count

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private router: Router,
              private breakpointService: NbMediaBreakpointsService,
              public dataManagementService: DataManagementService,
              public notificationService: NotificationsService,
              public translate: TranslateService,
              private nbLayoutService: NbLayoutDirectionService,
  ) {}


  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    // this.notificationService.findUnreadNotificationByIdUser
    // (Number(localStorage.getItem('id'))).subscribe(notification => {
    //   this.unreadNotificationsCount = notification;
    // });
    this.notificationService.findUnreadNotificationByIdUser(Number(localStorage.getItem('id'))).subscribe(unread => {
      this.notificationService.numberUnreadNotification = unread;
    });
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  navigateNotification() {
    this.router.navigate(['/pages/notification']);
  }
  translateLanguageTo(lang: string) {
    if (lang !== undefined) {
      this.translate.use(lang);
      if (lang === 'ar') {
        this.nbLayoutService.setDirection(NbLayoutDirection.RTL);
      } else {
        this.nbLayoutService.setDirection(NbLayoutDirection.LTR);
      }
      localStorage.setItem('lang', lang);
    }
  }

  logout() {
    this.router.navigate(['/signin'], { queryParams: { 'logout': '' } });
    localStorage.clear();
  }

  protected readonly String = String;
}
