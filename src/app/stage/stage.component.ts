
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
 

  Stage= {
    idStage:0,
      theme: "",
      departement: "",
      site: "",
      dateDebut: "",
      dateFin: "",
      bilan: "",
      reference: ""
      
    }

  edit(i:any){
    this.Stage=i;
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
          this.satgeService.addStagesToLocalCache(response)
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
  public searchStages (searchTerm : string) : void {
    const results : Stage[] = [] ;
    for (const stage of this.satgeService.getStagesFromLocalCache()){
      if ( stage.theme.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           stage.departement.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           stage.reference.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           stage.site.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1  )    {
            results.push(stage) ;
      }
    }
    this.stages=results ;
    if (results.length === 0 || ! searchTerm){
      this.stages = this.satgeService.getStagesFromLocalCache();
    }
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
    


  update(): void {
    
    this.satgeService.addStage(this.Stage).subscribe(
      (response) => {
        this.sendNotification(NotificationType.SUCCESS, 'Visite médicale added successfully');
        this.getStages(false);
        document.getElementById('new-user-close').click();
       
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to add visite médicale');
      }
    );
  
}



  selectStageForEdit(stage: Stage): void {
    this.clickButton('openstageEdit');
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
  public selectStage(selectedStage: Stage): void {
    this.selectedstage = selectedStage;
    this.clickButton('openStageInfo');
  }

}
