import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormationService } from '../service/formation.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { Formation } from '../model/Formation';
import { Planning } from '../model/Planning';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public formations: Formation[] = [];
  public selectedFormation: Formation;
  public formation: Formation;
  public refreshing: boolean;

  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;
  public editedEmployee = new Formation() ;
  ed= new Formation();
  constructor(
    private formationService: FormationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getFormations(true);
  }

  public onSelectFormation(selectedFormation: Formation): void {
    this.selectedFormation = selectedFormation;
    this.clickButton('openFormationInfo');
  }

  public saveNewFormation(): void {
    this.clickButton('new-formation-save');
  }

  public editFormationInfo(editFormation: Formation): void {
    this.clickButton('openFormationEdit');
  }

  private getFormations(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.formationService.getAllFormations().subscribe(
        (response: Formation[]) => {
          this.formations = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Formations loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load formations');
        }
      )
    );
  }
  
  addFormationToPlanning(idFormation: number): void {
    this.formationService.addFormationToPlanning(idFormation).subscribe(
      (response: Planning) => {
        if (response) {
          this.sendNotification(NotificationType.SUCCESS, 'Formation added to planning successfully');
          // Additional actions upon successful addition to planning
        } else {
          this.sendNotification(NotificationType.ERROR, 'Failed to add formation to planning');
        }
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to add formation to planning');
      }
    );
  }



  
  addNewFormation(formationForm: NgForm): void {
    if (formationForm.valid) {
      this.formationService.addFormation(formationForm.value).subscribe(
        (response: Formation) => {
          this.sendNotification(NotificationType.SUCCESS, 'Formation added successfully');
          this.getFormations(false);
          document.getElementById('new-formation-close').click();
          formationForm.resetForm();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add formation');
        }
      );
    }
  }

  updateFormation(formationForm: NgForm): void {
    if (formationForm.valid && this.selectedFormation) {
      this.formationService.updateFormation(this.selectedFormation.idFormation, formationForm.value).subscribe(
        (response: Formation) => {
          this.sendNotification(NotificationType.SUCCESS, 'Formation updated successfully');
          this.getFormations(false);
          this.selectedFormation = null;
          document.getElementById('edit-formation-close')?.click();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update formation');
        }
      );
    }
  }

  selectFormationForEdit(formation: Formation): void {
    this.ed = formation;
        this.clickButton('openFormationEdit');
  }

  deleteFormation(formationId: number): void {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.formationService.deleteFormation(formationId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Formation deleted successfully');
          this.getFormations(false);
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete formation');
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


  updaterec(editFormationForm: NgForm): void {
  

    const formValue = editFormationForm.value;
  
   
  
    const formData: FormData = this.formationService.createMouvementFormData(formValue);
  
    if (editFormationForm.valid) {
      this.subscriptions.push(
        this.formationService.updateformation(formData).subscribe(
          (response: Formation) => {
            this.sendNotification(NotificationType.SUCCESS, 'planning updated successfully');
            this.getFormations(true);
            this.clickButton('new-proposition-close');
            
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update planning');
          }
        )
      );
    }



  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
