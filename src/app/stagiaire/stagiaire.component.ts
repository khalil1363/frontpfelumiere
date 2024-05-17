import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import { NotificationType } from '../enum/notification-type.enum';
import { StagierService } from '../service/stagier.service';
import { NotificationService } from '../service/notification.service';
import { Stagier } from '../model/Stagier';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-stagier',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagierComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public stagiers: Stagier[];
  public selectedStagier: Stagier;
  public refreshing: boolean;

  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;




  public supervisorControl = new FormControl();
  public filteredSupervisors: Employee[];


  constructor(private stagierService: StagierService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getStagiers(true);
  }

  public getStagiers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.stagierService.getAllStagiers().subscribe(
        (response: Stagier[]) => {
          this.stagiers = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Stagiers loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load stagiers');
        }
      )
    );
  }
  

  filterSupervisors(name: string): void {
    // Call a service method to fetch supervisors from the database based on name
    this.stagierService.getSupervisorsByName(name).subscribe(
      (response: Employee[]) => {
        this.filteredSupervisors = response;
      },
      (error) => {
        console.error('Error fetching supervisors:', error);
      }
    );
  }


  displayFn(supervisor?: Employee): string | undefined {
    return supervisor ? supervisor.nomPrenom : undefined;
  }

  // Handle supervisor selection
  selectSupervisor(supervisor: Employee): void {
    this.supervisorControl.setValue(supervisor.nomPrenom);
    // You can set the supervisor object in your model as needed
    this.selectedStagier.superviseur = supervisor;
  }


  public selectStagier(stagier: Stagier): void {
    this.selectedStagier = stagier;
    this.clickButton('openStagierInfo');
  }

  public addNewStagier(stagierForm: NgForm): void {
    if (stagierForm.valid) {
      this.stagierService.addStagier(stagierForm.value).subscribe(
        (response: Stagier) => {
          this.sendNotification(NotificationType.SUCCESS, 'Stagier added successfully');
          this.getStagiers(false);
          document.getElementById('new-stagier-close')?.click();
          stagierForm.resetForm();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add stagier');
        }
      );
    }
  }

  public selectStagierForEdit(stagier: Stagier): void {
    this.selectedStagier = { ...stagier };
    this.clickButton('openStagierEdit');
  }

  public updateStagier(stagierForm: NgForm): void {
    if (stagierForm.valid && this.selectedStagier) {
      this.stagierService.updateStagier(this.selectedStagier.idStagier, stagierForm.value).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Stagier updated successfully');
          this.getStagiers(false);
          this.selectedStagier = null;
          document.getElementById('edit-stagier-close')?.click();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update stagier');
        }
      );
    }
  }

  public deleteStagier(stagierId: number): void {
    if (confirm('Are you sure you want to delete this stagier?')) {
      this.stagierService.deleteStagier(stagierId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Stagier deleted successfully');
          this.getStagiers(false);
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete stagier');
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
    document.getElementById(buttonId)?.click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  
}
