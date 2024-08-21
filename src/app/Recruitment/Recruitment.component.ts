import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormationService } from '../service/formation.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { Formation } from '../model/Formation';
import { Planning } from '../model/Planning';
import { Recruitment } from '../model/Recruitment';
import { RecruitmentService } from '../service/recruitment.service';
import { OffreEmploi } from '../model/OffreEmploi';
import { Employee } from '../model/Employee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-Recruitment',
  templateUrl: './Recruitment.component.html',
  styleUrls: ['./Recruitment.component.css']
})
export class RecruitmentComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public recretemnts: Recruitment[] = [];
  offreEmploi:OffreEmploi[];
  public refreshing: boolean;

  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;

  constructor(
    private recruitmentservice: RecruitmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getRc(true);
  }

  private getRc(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.recruitmentservice.getAllrec().subscribe(
        (response: Recruitment[]) => {
          this.recretemnts = response;
          console.log(this.recretemnts,"ujjytyjyt")
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Recruitment loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load Recruitment');
        }
      )
    );
  }





  Recruitment= {
    idRecrutement: 0,
    departement: "",
    recruteur: "",
    nomCondidat: "",
    commentaire: "",
    dateDemandeRec: "",
    emploiDemandeType: "",
    sourceType: "",
    selectionPhase: "",
    desisionType: "",
    vueGestionaire: "",
    vueDecideur: "",
    vueRh: "",

  }
  
  public updateRecruitment(): void {
    this.recruitmentservice.updateRecruitment(this.Recruitment.idRecrutement, this.Recruitment).subscribe(
      (response: Recruitment) => {
        this.sendNotification(NotificationType.SUCCESS, 'Recruitment updated successfully');
        this.getRc(false); // Reload the recruitments to reflect changes
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to update Recruitment');
      }
    );
  }

  public editRecruitment(recruitment: Recruitment): void {
    this.recruitmentservice.updateRecruitment(recruitment.idRecrutement, recruitment).subscribe(
        (response: Recruitment) => {
            this.sendNotification(NotificationType.SUCCESS, 'Recruitment updated successfully');
            // Additional logic to update the UI or handle the response can be added here
        },
        (error: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update Recruitment');
        }
    );
}




 


  public convertCandidatToEmployee(idRecrutement: number): void {
    this.recruitmentservice.convertCandidatToEmployee(idRecrutement).subscribe(
      (response: Employee) => {
        this.sendNotification(NotificationType.SUCCESS, 'Candidate successfully converted to Employee');
        // Additional logic to update the UI or handle the response can be added here
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to convert Candidate to Employee');
      }
    );
  }
  
 




  updaterec(editFormationForm: NgForm): void {
  

    const formValue = editFormationForm.value;
  
   
  
    const formData: FormData = this.recruitmentservice.createMouvementFormData(formValue);
  
    if (editFormationForm.valid) {
      this.subscriptions.push(
        this.recruitmentservice.updaterec(formData).subscribe(
          (response: Recruitment) => {
            this.sendNotification(NotificationType.SUCCESS, 'planning updated successfully');
            this.getRc(true);
            this.clickButton('new-proposition-close');
            
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update planning');
          }
        )
      );
    }



  }


  public saveNewFormation(): void {
    this.clickButton('new-formation-save');
  }



  public editFormationInfo(editFormation: Recruitment) {
    this.clickButton('openFormationEdit');
  }
public edit (i:any){
  this.Recruitment=i;
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
