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
import { Subscription } from "rxjs";
import { EffectifTotal } from "src/app/model/EffectifTotal";
import { Formation } from "src/app/model/Formation";
import { EffectifTotalService } from "src/app/service/EffectifTotalService";
import { FormationService } from "src/app/service/formation.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-Nbre',
  templateUrl: './Nbre.html',
  styleUrls: ['./Nbre.css']
})
export class Nbre implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public formations: Formation[] = [];
  public effectifs: EffectifTotal[] = [];
  public refreshing: boolean;
  private subscriptions: Subscription[] = [];
  public avgRatio: number = 0;

  constructor(
    private formationService: FormationService,
    private effectifTotalService: EffectifTotalService,
    private http: HttpClient
  ) {
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
              formatter: function (val) {
                return `${val.toFixed(2)}%`; // Display as percentage
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
      labels: [""]
    };
  }

  ngOnInit(): void {
    this.getFormations();
    this.getEffectifs();
  }

  private getFormations(): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.formationService.getAllFormations().subscribe(
        (response: Formation[]) => {
          this.formations = response;
          this.refreshing = false;
          this.calculateAvgRatio();
        },
        (error) => {
          this.refreshing = false;
          console.error("Error fetching formations", error);
        }
      )
    );
  }

  private getEffectifs(): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.effectifTotalService.getAllEffectifTotals().subscribe(
        (response: EffectifTotal[]) => {
          this.effectifs = response;
          this.refreshing = false;
          this.calculateAvgRatio();
        },
        (error) => {
          this.refreshing = false;
          console.error("Error fetching effectifs", error);
        }
      )
    );
  }

  private calculateAvgRatio(): void {
    if (this.formations.length === 0 || this.effectifs.length === 0) {
      this.avgRatio = 0;
      this.chartOptions.series = [0];
      return;
    }

    let totalEmployees = 0;
    let totalEffectifs = this.effectifs.reduce((acc, ef) => acc + (ef.effectiveTotal || 0), 0);

    this.formations.forEach(f => {
      totalEmployees += f.participants?.length || 0;
    });

    this.avgRatio = (totalEmployees / totalEffectifs) * 100; // Convert to percentage
    this.chartOptions.series = [this.avgRatio];
  }
}
