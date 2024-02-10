import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../@core/service/user.service';
import {ReclamationsService} from '../../../@core/service/reclamations.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_seriesLabel from 'highcharts/modules/series-label';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
// Initialize the modules
HC_exporting(Highcharts);
HC_seriesLabel(Highcharts);
HC_exportData(Highcharts);
HC_accessibility(Highcharts);
@Component({
  selector: 'ngx-reclamation-stats-user',
  templateUrl: './reclamation-stats-user.component.html',
  styleUrls: ['./reclamation-stats-user.component.scss'],
})
export class ReclamationStatsUserComponent implements OnInit {

  private langChangeSubscription: Subscription;
  selectedAuth: string = 'assigned';
  selectedUsers: number = 1;
  AVG: number = 0;
  stats: any[] = [];
  formExpanded: boolean = true;
  lastUpdate: Date;
  // date
  startDate: Date = new Date();
  endDate: Date = new Date();
  formControl = new FormControl(this.startDate);
  formControl1 = new FormControl(this.endDate);
  users: any[] = [];
  optionUsers: any[] = [];
  chartOptions: Highcharts.Options = {
    // Highcharts chart options go here
  };
  constructor(
    private userService: UserService,
    private ticketService: ReclamationsService,
    private translateService: TranslateService,
  ) {
    this.initializeChart();
  }

  ngOnInit(): void {
    this.userService.findAllUsersService().subscribe(users => {
      this.users = users;
      this.updateUsers();
    });
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.initializeChart();
      },
    );
  }
  updateUsers() {
    this.optionUsers = this.users.filter(user => user.authorities[0].label === this.selectedAuth);
  }

  collapseForm(dataStatus: boolean) {
    this.formExpanded = !dataStatus;
  }
  refreshZone() {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    this.ticketService.getAvgTreatmentPeriodByUserInPeriod(
      this.selectedUsers, this.selectedAuth, startDate, endDate).subscribe(avg => {
        this.AVG = avg;
        this.ticketService.getDailyTicketSummaryByStatusBetweenPeriod(
        this.selectedUsers, this.selectedAuth, startDate, endDate).subscribe(stats => {
        this.stats = stats;
        this.initializeChart();
        this.formExpanded = false;
      });
      });
    }
  private initializeChart(): void {
    const categories = this.stats.map((entry) => entry.date);

    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: this.translateService.instant('stats.taskProgression'),
        align: 'left',
      },
      xAxis: {
        categories: categories,
        accessibility: {
          rangeDescription: 'Range: ' + categories[0] + ' to ' + categories[categories.length - 1],
        },
      },
      yAxis: {
        title: {
          text: this.translateService.instant('stats.count'),
        },
      },
      series: [
        {
          name: this.translateService.instant('dashboard.progress'),
          type: 'line',
          data: this.stats.map((entry) => entry.progress),
        },
        {
          name: this.translateService.instant('dashboard.pending'),
          type: 'line',
          data: this.stats.map((entry) => entry.pending),
        },
        {
          name: this.translateService.instant('dashboard.treated'),
          type: 'line',
          data: this.stats.map((entry) => entry.treated),
        },
        {
          name: this.translateService.instant('dashboard.total'),
          type: 'line',
          data: this.stats.map((entry) => entry.total),
        },
      ],
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
    };
  }

  protected readonly Highcharts = Highcharts;

}
