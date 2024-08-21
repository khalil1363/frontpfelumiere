
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

import { VisiteMedicale } from '../model/Vesite';
import { VisiteMedicaleService } from '../service/visite-medicale.service';
import { PropositionFormationService } from '../service/proposition-formation.service';
import { Employee } from '../model/Employee';
import { Chauffeur } from '../model/Chauffeur';
import { ChauffeurService } from '../service/chauffeur.service';

@Component({
  selector: 'app-Chauffeur',
  templateUrl: './Chauffeur.component.html',
  styleUrls: ['./Chauffeur.component.css']
})
export class ChauffeurComponent implements OnInit , OnDestroy  {
  private subscriptions: Subscription[] = [];
  public chauffeurs: Chauffeur[];
  public selectedChauffeur: Chauffeur;
  public refreshing: boolean;
  public employee: Employee;
  public recapData: any[];
  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;
  signatureOptions: string[] = ['NaN', 'OK'];
  selectedSignature: string = 'NaN';
  Chauffeur= {
    id:0,
    date: "",
    mat: "",
    ste: "",
    nom: "",
    prenom: "",
    site: "",
    reference: "",
    signature: "",
    remarque: ""
  }
  constructor(
    private chauffeurService: ChauffeurService,
    private notificationService: NotificationService,
  
  ) {}

  ngOnInit(): void {
    this.getChauffeurs(true);
  }


  private getChauffeurs(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.chauffeurService.getAllChauffeurs().subscribe(
        (response) => {
        
          
          this.chauffeurs = response;
          console.log('Chauffeurs Loaded:', this.chauffeurs); 
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Chauffeurs loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load chauffeurs');
        }
      )
    );
  }

  

 

  addNewChauffeur(chauffeurForm: NgForm): void {
    if (chauffeurForm.valid) {
      this.chauffeurService.createChauffeur(chauffeurForm.value).subscribe(
        (response) => {
          this.sendNotification(NotificationType.SUCCESS, 'Chauffeur added successfully');
          this.getChauffeurs(false);
          chauffeurForm.resetForm();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add chauffeur');
        }
      );
    }
  }
  update(): void {
    
    this.chauffeurService.createChauffeur(this.Chauffeur).subscribe(
      (response) => {
        this.sendNotification(NotificationType.SUCCESS, 'Visite médicale added successfully');
        this.getChauffeurs(false);
        document.getElementById('new-user-close').click();
       
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to add visite médicale');
      }
    );
  
}
edit(i:any){
  this.Chauffeur=i;
  }
  

  selectChauffeurForEdit(chauffeur: Chauffeur): void {
   
    this.clickButton('openChauffeurEdit');
  }

  deleteChauffeur(chauffeurId: number): void {
    if (confirm('Are you sure you want to delete this chauffeur?')) {
      this.chauffeurService.deleteChauffeur(chauffeurId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Chauffeur deleted successfully');
          this.getChauffeurs(false);
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete chauffeur');
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

  public selectChauffeur(selectedChauffeur: Chauffeur): void {
    this.selectedChauffeur = selectedChauffeur;
    this.clickButton('openChauffeurInfo');
  }
}