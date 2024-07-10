
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
  selector: 'app-vesite',
  templateUrl: './vesite.component.html',
  styleUrls: ['./vesite.component.css']
})
export class vesiteComponent implements OnInit , OnDestroy  {
  private subscriptions: Subscription[] = [];
  public visitesMedicales: VisiteMedicale[];
  public selectedVisiteMedicale: VisiteMedicale;
  public refreshing: boolean;
  public employee: Employee;
  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;

  constructor(
    private visiteMedicaleService: VisiteMedicaleService,
    private notificationService: NotificationService,
    private propositionService: PropositionFormationService
  ) {}

  ngOnInit(): void {
    this.getVisitesMedicales(true);
  }

  private getVisitesMedicales(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.visiteMedicaleService.getAllVisitesMedicales().subscribe(
        (response) => {
          this.visiteMedicaleService.addVisitesMedicalesToLocalCache(response);
          this.visitesMedicales = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Visites médicales loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load visites médicales');
        }
      )
    );
  }

  onMatChange(mat: string): void {
    if (mat) {
      this.propositionService.getEmployeeByMat(mat).subscribe(
        (employee) => {
          this.employee = employee;
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Employee not found');
        }
      );
    }
  }



  
  public searchVisitesMedicales(searchTerm: string): void {
    const results: VisiteMedicale[] = [];
    for (const visite of this.visiteMedicaleService.getVisitesMedicalesFromLocalCache()) {
      if (
        visite.mat.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        visite.nomPrenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        visite.post.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        visite.site.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      ) {
        results.push(visite);
      }
    }
    this.visitesMedicales = results;
    if (results.length === 0 || !searchTerm) {
      this.visitesMedicales = this.visiteMedicaleService.getVisitesMedicalesFromLocalCache();
    }
  }

  addNewVisiteMedicale(visiteMedicaleForm: NgForm): void {
    if (visiteMedicaleForm.valid) {
      this.visiteMedicaleService.addVisiteMedicale(visiteMedicaleForm.value).subscribe(
        (response) => {
          this.sendNotification(NotificationType.SUCCESS, 'Visite médicale added successfully');
          this.getVisitesMedicales(false);
          document.getElementById('new-user-close').click();
          visiteMedicaleForm.resetForm();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add visite médicale');
        }
      );
    }
  }

  updateVisiteMedicale(visiteMedicaleForm: NgForm): void {
    if (visiteMedicaleForm.valid && this.selectedVisiteMedicale) {
      this.visiteMedicaleService.updateVisiteMedicale(this.selectedVisiteMedicale.id, visiteMedicaleForm.value).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Visite médicale updated successfully');
          this.getVisitesMedicales(false);
          this.selectedVisiteMedicale = null;
          document.getElementById('edit-user-close')?.click();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update visite médicale');
        }
      );
    }
  }

  selectVisiteMedicaleForEdit(visiteMedicale: VisiteMedicale): void {
    this.selectedVisiteMedicale = { ...visiteMedicale };
    this.clickButton('openVisiteMedicaleEdit');
  }

  deleteVisiteMedicale(visiteMedicaleId: number): void {
    if (confirm('Are you sure you want to delete this visite médicale?')) {
      this.visiteMedicaleService.deleteVisiteMedicale(visiteMedicaleId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Visite médicale deleted successfully');
          this.getVisitesMedicales(false);
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete visite médicale');
        }
      );
    }
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public selectVisiteMedicale(selectedVisiteMedicale: VisiteMedicale): void {
    this.selectedVisiteMedicale = selectedVisiteMedicale;
    this.clickButton('openVisiteMedicaleInfo');
  }
}