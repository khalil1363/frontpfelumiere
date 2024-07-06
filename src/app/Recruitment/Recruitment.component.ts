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




















  public saveNewFormation(): void {
    this.clickButton('new-formation-save');
  }

  public editFormationInfo(editFormation: Formation): void {
    this.clickButton('openFormationEdit');
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
