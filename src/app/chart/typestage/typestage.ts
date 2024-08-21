import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { Stagier } from "src/app/model/Stagier";
import { StagierService } from "src/app/service/stagier.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-typestage',
  templateUrl: './typestage.html',
  styleUrls: ['./typestage.css']
})

export class typestageComponent implements OnInit, OnDestroy   {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private subscriptions: Subscription[] = [];
  public stagiers: Stagier[] = [];
  public refreshing: boolean;
  constructor(private stagierService: StagierService) { }

  ngOnInit(): void {
    this.getChartsData();
  }
  public getChartsData(): void {
    this.refreshing = true;
    this.stagierService.getAllStagiers().subscribe(
      (response: Stagier[]) => {
        this.stagiers = response;
        this.refreshing = false;

        const societeMap = new Map<string, number>();
        this.stagiers.forEach((stagier) => {
          const societe = stagier.societe;
          if (societeMap.has(societe)) {
            societeMap.set(societe, societeMap.get(societe) + 1);
          } else {
            societeMap.set(societe, 1);
          }
        });

        const seriesData: number[] = Array.from(societeMap.values());
        const labelsData: string[] = Array.from(societeMap.keys());

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
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}