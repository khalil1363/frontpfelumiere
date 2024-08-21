import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlanningService } from '../service/planning.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { Planning } from '../model/Planning';
import { HttpErrorResponse } from '@angular/common/http';


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
  public editedEmployee = new Planning() ;
  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;
  pl=new Planning();
  public editUser= new Planning();
  constructor(
    private planningService: PlanningService,
    private notificationService: NotificationService,
    
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
    this.pl = editPlanning;
    console.log(this.pl)
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
  











  updateplanning(planningForm: NgForm): void {
  

    const formValue = planningForm.value;
  
   
  
    const formData: FormData = this.planningService.createMouvementFormData(formValue);
  
    if (planningForm.valid) {
      this.subscriptions.push(
        this.planningService.updateplanning(formData).subscribe(
          (response: Planning) => {
            this.sendNotification(NotificationType.SUCCESS, 'planning updated successfully');
            this.getPlannings(true);
            this.clickButton('new-proposition-close');
            
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update planning');
          }
        )
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
