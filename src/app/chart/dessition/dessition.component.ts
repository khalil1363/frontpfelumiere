import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { Planning } from "src/app/model/Planning";
import { Recruitment } from "src/app/model/Recruitment";
import { PlanningService } from "src/app/service/planning.service";
import { RecruitmentService } from "src/app/service/recruitment.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-dessition',
  templateUrl: './dessition.component.html',
  styleUrls: ['./dessition.component.css']
})

export class dessitionComponent implements OnInit, OnDestroy   {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private subscriptions: Subscription[] = [];
  public recruitments: Recruitment[] = [];
  public selectedPlanning: Planning;
  public refreshing: boolean;
  constructor(private recruitmentService: RecruitmentService) { }

  ngOnInit(): void {
    this.getChartsData();
  }

  public getChartsData(): void {
    this.refreshing = true;
    this.recruitmentService.getAllrec().subscribe(
      (response: Recruitment[]) => {
        this.recruitments = response;
        this.refreshing = false;

        const decisionMap = new Map<string, number>();
        this.recruitments.forEach((recruitment) => {
          const decision = recruitment.desisionType;
          if (decisionMap.has(decision)) {
            decisionMap.set(decision, decisionMap.get(decision) + 1);
          } else {
            decisionMap.set(decision, 1);
          }
        });

        const seriesData: number[] = Array.from(decisionMap.values());
        const labelsData: string[] = Array.from(decisionMap.keys());

        this.chartOptions = {
          series: seriesData,
          chart: {
            width: 380,
            type: "pie",
          },
          labels: labelsData,
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
      },
      (error) => {
        this.refreshing = false;
        console.error('Error fetching recruitment data', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}