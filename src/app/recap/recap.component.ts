
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

import { VisiteMedicale } from '../model/Vesite';
import { VisiteMedicaleService } from '../service/visite-medicale.service';
import { PropositionFormationService } from '../service/proposition-formation.service';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class recapComponent implements OnInit  {
  private subscriptions: Subscription[] = [];

  public selectedVisiteMedicale: VisiteMedicale;
  public refreshing: boolean;
  public employee: Employee;
  public recapData: any[]
  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;


  visitesMedicales: VisiteMedicale[] = [];
  summaryData: any[] = [];
  displayedColumns: string[] = ['site', 'total', 'suivi', 'rest', 'taux'];
  lastUpdated: Date;

  constructor(
    private visiteMedicaleService: VisiteMedicaleService,
    private notificationService: NotificationService,
    private propositionService: PropositionFormationService
  ) {}

  ngOnInit(): void {
    this.visiteMedicaleService.getAllVisitesMedicales().subscribe(data => {
      this.visitesMedicales = data;
      this.calculateSummary();
    });
  }
  calculateSummary(): void {
    const siteData: any = {};

    this.visitesMedicales.forEach(visite => {
      const site = visite.site;
      if (!siteData[site]) {
        siteData[site] = { total: 0, suivi: 0, rest: 0 };
      }
      siteData[site].total++;
      if (visite.dateVisite) {
        siteData[site].suivi++;
      } else {
        siteData[site].rest++;
      }
    });

    for (const site in siteData) {
      const total = siteData[site].total;
      const suivi = siteData[site].suivi;
      const rest = siteData[site].rest;
      const taux = total ? ((suivi / total) * 100).toFixed(2) + '%' : '0%';

      this.summaryData.push({
        site,
        total,
        suivi,
        rest,
        taux
      });
    }
  }
 
}