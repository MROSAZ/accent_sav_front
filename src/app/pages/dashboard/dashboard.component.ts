import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataManagementService} from '../../@core/service/data-management.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public dataManagementService: DataManagementService,
  ) {
  }
  ngOnInit() {
    if (!this.dataManagementService.checkDataLoaded()) {
      this.dataManagementService.loadData();
    }
  }
}
