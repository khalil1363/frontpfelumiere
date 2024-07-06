import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { Planning } from "src/app/model/Planning";
import { PlanningService } from "src/app/service/planning.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-typeformation',
  templateUrl: './typeformation.component.html',
  styleUrls: ['./typeformation.component.css']
})

export class typeformationComponent implements OnInit, OnDestroy   {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private subscriptions: Subscription[] = [];
  public plannings: Planning[] = [];
  public selectedPlanning: Planning;
  public refreshing: boolean;
  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {
    this.getChartsData();
  }
  public getChartsData(): void {
    this.refreshing = true;
    this.planningService.getAllPlannings().subscribe(
      (response: Planning[]) => {
        this.plannings = response;
        this.refreshing = false;

        const typesMap = new Map<string, number>();
        this.plannings.forEach((plan) => {
          const type = plan.type;
          if (typesMap.has(type)) {
            typesMap.set(type, typesMap.get(type) + 1);
          } else {
            typesMap.set(type, 1);
          }
        });
  
  
        const seriesData: number[] = Array.from(typesMap.values());
        const labelsData: string[] = Array.from(typesMap.keys());
  
  this.chartOptions = {
    series:seriesData,
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
)


}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}


}
