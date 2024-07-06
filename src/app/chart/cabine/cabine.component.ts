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
import { Planning } from 'src/app/model/Planning';
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
  selector: 'app-cabine',
  templateUrl: './cabine.component.html',
  styleUrls: ['./cabine.component.css']
})

export class cabineComponent implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];
  public plannings: Planning[] = [];
  public selectedPlanning: Planning;
  public refreshing: boolean;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.getChartsData();
  }


    public async getChartsData(): Promise<void> {
      this.refreshing = true;
       this.planningService.getAllPlannings().subscribe(
        (response: Planning[]) => {
          this.plannings = response;
          this.refreshing = false;
          const cabines = [];
          this.plannings.map((plan) => {
            if (!cabines.includes(plan.cabinetproposer))
              cabines.push(plan.cabinetproposer)
          })
          const data : number[] = Array.from({ length: cabines.length }).fill(0) as number[];
          this.plannings.map((plan) => {
            const cabineIndex = cabines.findIndex((cabine) => cabine == plan.cabinetproposer);
            data[cabineIndex] += Number(plan.coutreel);
          })





          this.chartOptions = {
            series:[
              {
                name: "Somme de coût formation",
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
              labels: {
                rotate: -45
              },
              categories: cabines,
              tickPlacement: "on",
              title: {
                text: "Chiffre d’affaire par cabinet de formation"
              }
            },
            yaxis: {
              
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

