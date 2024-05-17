
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';
import { Stage } from '../model/Stage';
import { StageService } from '../service/stage.service';
@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class stageComponent implements OnInit , OnDestroy  {
  private subscriptions : Subscription [] =[]; 
  public stages :Stage[] ; 
  public selectedstage : Stage ;
  public stage : Stage ;
  public refreshing : boolean ; 

  p: number = 1;
  itemsPerPage : number = 6;
  totalElements: any ;
  constructor(  private satgeService : StageService  ,  private notificationService : NotificationService ){}
  ngOnInit(): void {
    this.getStages(true) ;
  }
  public onSelectUser(selectedstage: Stage): void {
    this.selectedstage = selectedstage;
    this.clickButton('openUserInfo'); // button id = (openUserInfo) data-target = #viewUserModal
  }
  public saveNewUser () : void { // open newUserModal 
    this.clickButton('new-user-save');
  }
  
  public editstageInfo (editstage :User):void{
    
    this.clickButton('openUserEdit') ;
  }
  private getStages(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.satgeService.getAllStages().subscribe(
        (response) => {
          this.stages = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Stages loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load stages');
        }
      )
    );
  }

  addNewStage(stageForm: NgForm): void {
    if (stageForm.valid) {
      this.satgeService.addStage(stageForm.value).subscribe(
        (response) => {
          this.sendNotification(NotificationType.SUCCESS, 'Stage added successfully');
          this.getStages(false); // Refresh the stage list
          document.getElementById('new-user-close').click(); // Close the modal
          stageForm.resetForm(); // Clear the form
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add stage');
        }
      );
    }
  }
  updateStage(stageForm: NgForm): void {
    if (stageForm.valid && this.selectedstage) {
      this.satgeService.updateStage(this.selectedstage.idStage, stageForm.value).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Stage updated successfully');
          this.getStages(false); // Refresh the stage list
          this.selectedstage = null; // Reset selected stage
          document.getElementById('edit-user-close')?.click(); // Close the modal
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update stage');
        }
      );
    }
  }
  selectStageForEdit(stage: Stage): void {
    // Create a copy of the selected stage to avoid modifying the original stage directly
    this.selectedstage = { ...stage };
    // Open the edit modal
    this.clickButton('openUserEdit');
  }
  deleteStage(stageId: number): void {
    if (confirm('Are you sure you want to delete this stage?')) {
      this.satgeService.deleteStage(stageId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Stage deleted successfully');
          this.getStages(false); // Refresh the stage list
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete stage');
        }
      );
    }
  }
  private sendNotification(notificationType: NotificationType, message: string) :void{
    if(message){
      this.notificationService.notify(notificationType,message) ;
    } else {
      this.notificationService.notify(notificationType, 'An error occure . please try again ');
    }
  }    
  private clickButton(buttonId : string) : void {
    document.getElementById(buttonId).click();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
