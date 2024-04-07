import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataManagementService} from '../../@core/service/data-management.service';
import {ComponentService} from '../../@core/service/component.service';

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
    public componentService: ComponentService,
  ) {
  }
  ngOnInit() {
    if (!this.dataManagementService.checkDataLoaded()) {
      this.dataManagementService.loadData();
    }
  }

  getQuantityColor(quantity: number): string {
    if (quantity < 5) {
      return 'bg-danger'; // Background red
    } else if (quantity < 10) {
      return 'bg-warning'; // Background yellow
    } else {
      return 'bg-success'; // Background green
    }
  }
}
