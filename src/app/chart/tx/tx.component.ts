import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";
import { Planning } from "src/app/model/Planning";
import { PlanningService } from "src/app/service/planning.service";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class txcomponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public plannings: Planning[] = [];
  public filteredPlannings: Planning[] = [];
  public avgDays: number = 0;

  constructor(private planningService: PlanningService, private http: HttpClient) {
    this.chartOptions = {
      
      series: [0] ,
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return val + "";
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Tx de conformité"]
    };
  }

  calculateAvgDays(): void {


    const realiserPlannings = this.plannings.filter(p => p.statusPlannig.toLowerCase() === "realiser");

    if (realiserPlannings.length > 0) {


      let totalDays = 0.00;
      realiserPlannings.forEach(p => {
       
       
        let x:number = parseFloat(p.coutreel)
        console.log("x="+x)
        let h:number=parseFloat(p.budgetPrevisionnel)
       console.log("h="+h)
        
   
        console.log( "x/h"+x/h)
        if(h==0)
          console.log("impo")
else
        totalDays += (x/h);
      });
      console.log(totalDays)

      this.avgDays = Math.round(totalDays*1000)/1000;





      this.chartOptions.series = [this.avgDays];
    } else {
      this.avgDays = 0;
      this.chartOptions.series = [0];
    }
  }

  ngOnInit(): void {
    this.planningService.getAllPlannings().subscribe((plannings) => {
      this.plannings = plannings;
      this.filteredPlannings = [...this.plannings];
      this.calculateAvgDays();
    });
  }
}
