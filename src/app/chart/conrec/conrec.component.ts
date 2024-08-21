import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { Subscription } from "rxjs";
import { Recruitment } from "src/app/model/Recruitment";
import { RecruitmentService } from "src/app/service/recruitment.service";
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-conrec',
  templateUrl: './conrec.component.html',
  styleUrls: ['./conrec.component.css']
})
export class conrecComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}; // Initialize as an empty object
  private subscriptions: Subscription[] = [];
  public refreshing: boolean = false;

  constructor(private recruitmentService: RecruitmentService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getChartsData();
  }

  public getChartsData(): void {
    this.refreshing = true;
    const sub = this.recruitmentService.getAllrec().pipe(
      map((response: Recruitment[]) => {
        const sourceTypeMap = new Map<string, number>();
        response.forEach((rec) => {
          const type = rec.sourceType || 'Unknown'; // Ensure type is not null
          if (sourceTypeMap.has(type)) {
            sourceTypeMap.set(type, sourceTypeMap.get(type)! + 1);
          } else {
            sourceTypeMap.set(type, 1);
          }
        });

        const seriesData = Array.from(sourceTypeMap.values());
        const labelsData = Array.from(sourceTypeMap.keys());

        console.log('Series Data:', seriesData); // Debug log
        console.log('Labels Data:', labelsData); // Debug log

        return { seriesData, labelsData };
      })
    ).subscribe(
      (chartData) => {
        if (chartData.seriesData && chartData.labelsData) {
          this.chartOptions = {
            series: chartData.seriesData,
            chart: {
              width: 380,
              type: "pie",
            },
            labels: chartData.labelsData,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        } else {
          console.error('Chart data is invalid:', chartData);
        }
        this.cdr.detectChanges(); // Trigger change detection manually
        this.refreshing = false;
      },
      (error) => {
        this.refreshing = false;
        console.error('Error fetching recruitment data', error);
      }
    );
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
