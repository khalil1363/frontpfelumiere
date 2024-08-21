import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { OffreEmploi } from 'src/app/model/OffreEmploi';
import { Planning } from 'src/app/model/Planning';
import { OffreEmploiService } from 'src/app/service/offre-emploi-service.service';
import { PlanningService } from 'src/app/service/planning.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};
@Component({
  selector: 'app-moderec',
  templateUrl: './moderec.component.html',
  styleUrls: ['./moderec.component.css']
})

export class moderecComponent implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];
  public offresEmploi: OffreEmploi[] = [];
  public selectedPlanning: Planning;
  public refreshing: boolean;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private offreEmploiService: OffreEmploiService) {}
  ngOnInit(): void {
    this.getChartsData();
  }

  public async getChartsData(): Promise<void> {
    this.refreshing = true;
    this.offreEmploiService.getAllOffresEmploi().subscribe(
      (response: OffreEmploi[]) => {
        this.offresEmploi = response;
        this.refreshing = false;
        
        const modeRecrutementCounts = this.offresEmploi.reduce((acc, offre) => {
          acc[offre.modeRecretement] = (acc[offre.modeRecretement] || 0) + 1;
          return acc;
        }, {});

        const categories = Object.keys(modeRecrutementCounts);
        const data = Object.values(modeRecrutementCounts);

        this.chartOptions = {
          series: [
            {
              name: "Mode Recrutement Count",
              data: data as number[]
            }
          ],
          chart: {
            height: 350,
            type: "bar"
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2
          },
          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"]
            }
          },
          xaxis: {
            labels: {
              rotate: -45
            },
            categories: categories,
            tickPlacement: "on",
            title: {
              text: "Mode Recrutement"
            }
          },
          yaxis: {
            title: {
              text: "Count"
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            }
          }
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