import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ReclamationsService} from '../../../@core/service/reclamations.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_seriesLabel from 'highcharts/modules/series-label';
import HC_exportData from 'highcharts/modules/export-data';
import HC_accessibility from 'highcharts/modules/accessibility';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SousCategoryService} from '../../../@core/service/sous-category.service';
// Initialize the modules
HC_exporting(Highcharts);
HC_seriesLabel(Highcharts);
HC_exportData(Highcharts);
HC_accessibility(Highcharts);
@Component({
  selector: 'ngx-reclamation-stats-sub-category',
  templateUrl: './reclamation-stats-sub-category.component.html',
  styleUrls: ['./reclamation-stats-sub-category.component.scss'],
})
export class ReclamationStatsSubCategoryComponent implements OnInit {

  private langChangeSubscription: Subscription;
  selectedSubCategory: number = 1;
  AVG: number = 0;
  stats: any[] = [];
  formExpanded: boolean = true;
  // date
  startDate: Date = new Date();
  endDate: Date = new Date();
  formControl = new FormControl(this.startDate);
  formControl1 = new FormControl(this.endDate);
  subCategories: any[] = [];
  chartOptions: Highcharts.Options = {
    // Highcharts chart options go here
  };
  constructor(
    private subCategoryService: SousCategoryService,
    private ticketService: ReclamationsService,
    private translateService: TranslateService,
  ) {
    this.initializeChart();
  }

  ngOnInit(): void {
    this.subCategoryService.findAllSubCategoryServices().subscribe(subCategory => {
      this.subCategories = subCategory;
    });
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.initializeChart();
      },
    );
  }

  collapseForm(dataStatus: boolean) {
    this.formExpanded = !dataStatus;
  }
  refreshZone() {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    this.ticketService.getAvgTreatmentPeriodBySubCategoryInPeriod(
      this.selectedSubCategory, startDate, endDate).subscribe(avg => {
      this.AVG = avg;
      this.ticketService.getDailyTicketSummaryBySubCategoryBetweenPeriod(
        this.selectedSubCategory, startDate, endDate).subscribe(stats => {
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
