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
  ApexGrid,
  ApexTooltip
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { Planning } from 'src/app/model/Planning';
import { Stagier } from 'src/app/model/Stagier';
import { PlanningService } from 'src/app/service/planning.service';
import { StagierService } from 'src/app/service/stagier.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-st',
  templateUrl: './st.html',
  styleUrls: ['./st.css']
})

export class st implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];
  public stagiers: Stagier[] = [];
  public refreshing: boolean;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor(private stagierService: StagierService) {}
  ngOnInit(): void {
    this.getChartsData();
  } public async getChartsData(): Promise<void> {
    this.refreshing = true;
    this.stagierService.getAllStagiers().subscribe(
      (response: Stagier[]) => {
        this.stagiers = response;
        this.refreshing = false;

        const instituts = [];
        const data = [];
        const nomPrenomMap = new Map<string, string[]>(); 

        this.stagiers.forEach((stagier) => {
          if (!instituts.includes(stagier.institut)) {
            instituts.push(stagier.institut);
            nomPrenomMap.set(stagier.institut, []);
          }
          nomPrenomMap.get(stagier.institut).push(stagier.nomPrenom);
        });

        instituts.forEach(institut => {
          data.push(nomPrenomMap.get(institut).length);
        });

        this.chartOptions = {
          series: [
            {
              name: "Number of stagiers",
              data: data
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
            categories: instituts,
            tickPlacement: "on",
            title: {
              text: "Instituts"
            }
          },
          yaxis: {},
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
          },
          tooltip: {
            y: {
              formatter: function (val, opts) {
                const institut = opts.w.globals.categoryLabels[opts.dataPointIndex];
                const names = nomPrenomMap.get(institut).join(', ');
                return `Names: ${names}`;
              }
            }
          }
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