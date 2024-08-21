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
  selector: 'app-cnfcpp',
  templateUrl: './cnfcpp.html',
  styleUrls: ['./cnfcpp.css']
})
export class cnfcpp implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public plannings: Planning[] = [];
  public filteredPlannings: Planning[] = [];
  public totalBudgetEstimatif: number = 0; // Renamed to totalBudgetEstimatif for clarity

  constructor(private planningService: PlanningService, private http: HttpClient) {
    this.chartOptions = {
      series: [0],
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
                return `${val}`; // Show value as is (sum of budgetEstimatif)
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
      labels: ["DT"]
    };
  }

  calculateTotalBudgetEstimatif(): void {
    // Filter plannings by statusPlannig "realiser" and calculate the sum of budgetEstimatif
    this.totalBudgetEstimatif = this.filteredPlannings
      .filter((p) => p.statusPlannig.toLowerCase() === "realiser")
      .reduce(
        (sum, p) => sum + parseFloat(p.budgetEstimatif.replace(",", ".")), // Assuming budgetEstimatif is numeric
        0
      );
    
    // Update chart series with the calculated total
    this.chartOptions.series = [this.totalBudgetEstimatif];
  }

  filterByStatus(status: string): void {
    // Update filteredPlannings based on statusPlannig filter
    this.filteredPlannings = this.plannings.filter(
      (p) => p.statusPlannig.toLowerCase() === status.toLowerCase()
    );
    // Recalculate total budget estimatif for the filtered data
    this.calculateTotalBudgetEstimatif();
  }

  ngOnInit(): void {
    // Fetch all plannings from backend
    this.planningService.getAllPlannings().subscribe((plannings) => {
      this.plannings = plannings;
      // Initialize filteredPlannings with all plannings initially
      this.filteredPlannings = [...this.plannings];
      // Calculate initial total budget estimatif
      this.calculateTotalBudgetEstimatif();
    });
  }
}