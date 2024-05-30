import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlanningService } from '../service/planning.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { Planning } from '../model/Planning';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public plannings: Planning[] = [];
  public selectedPlanning: Planning;
  public refreshing: boolean;

  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;

  constructor(
    private planningService: PlanningService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getPlannings(true);
  }

  public onSelectPlanning(selectedPlanning: Planning): void {
    this.selectedPlanning = selectedPlanning;
    this.clickButton('openPlanningInfo');
  }

  public saveNewPlanning(): void {
    this.clickButton('new-planning-save');
  }

  public editPlanningInfo(editPlanning: Planning): void {
    this.clickButton('openPlanningEdit');
  }

  public getPlannings(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.planningService.getAllPlannings().subscribe(
        (response: Planning[]) => {
          this.plannings = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Plannings loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load plannings');
        }
      )
    );
  }

  addNewPlanning(planningForm: NgForm): void {
    if (planningForm.valid) {
      this.planningService.addPlanning(planningForm.value).subscribe(
        (response: Planning) => {
          this.sendNotification(NotificationType.SUCCESS, 'Planning added successfully');
          this.getPlannings(false);
          document.getElementById('new-planning-close').click();
          planningForm.resetForm();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add planning');
        }
      );
    }
  }

  updatePlanning(planningForm: NgForm): void {
    if (planningForm.valid && this.selectedPlanning) {
      this.planningService.updatePlanning(this.selectedPlanning).subscribe(
        (response: Planning) => {
          this.sendNotification(NotificationType.SUCCESS, 'Planning updated successfully');
          this.getPlannings(false);
          this.selectedPlanning = null;
          document.getElementById('edit-planning-close').click();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update planning');
        }
      );
    }
  }

  selectPlanningForEdit(planning: Planning): void {
    this.selectedPlanning = { ...planning };
    this.clickButton('openPlanningEdit');
  }

  deletePlanning(planningId: number): void {
    if (confirm('Are you sure you want to delete this planning?')) {
      this.planningService.deletePlanning(planningId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Planning deleted successfully');
          this.getPlannings(false);
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete planning');
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
}
