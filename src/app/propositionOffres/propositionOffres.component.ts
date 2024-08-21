import { Component, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { Candidat } from '../model/Candidat';
import { CandidatService } from '../service/candidat.service';
import { NotificationService } from '../service/notification.service';
import { PropositionOffre } from '../model/PropositionOffre';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PropositionOffreService } from '../service/proposition-offre-service.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-propositionOffres',
  templateUrl: './propositionOffres.component.html',
  styleUrls: ['propositionOffres.component.css']
})

export class propositionOffresComponent implements OnInit {
  propositionOffres: PropositionOffre[];
  selectedProposition: PropositionOffre;
  form: FormGroup;
  isLoading = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private propositionOffreService: PropositionOffreService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getPropositionOffres();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      departement: ['', Validators.required],
      jobTitle: ['', Validators.required],
      coutEmbauche: ['', Validators.required],
      duree: ['', Validators.required],
      motifRecrutement: ['', Validators.required],
      dateLancement: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      recruteur: ['', Validators.required],
      modeRecrutement: ['', Validators.required]
    });
  }

  getPropositionOffres(): void {
    this.isLoading = true;
    this.propositionOffreService.getAllPropositionOffres().subscribe(
      (response: PropositionOffre[]) => {
        this.propositionOffres = response;
        this.isLoading = false;
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, 'Failed to fetch proposition offres');
        this.isLoading = false;
      }
    );
  }

  selectProposition(prop: PropositionOffre): void {
    this.selectedProposition = prop;
  }

  
  public editFormationInfo(offre: PropositionOffre) {
    this.clickButton('openFormationEdit');
  }

  public addNewProposition(offreEmploiForm: NgForm): void {
    if (offreEmploiForm.valid) {
      this.propositionOffreService.addNewPropositionOffre(offreEmploiForm.value).subscribe(
        (response: PropositionOffre) => {
          this.notificationService.notify(NotificationType.SUCCESS, 'Proposition ajoutée avec succès');
          this.getPropositionOffres();
          offreEmploiForm.resetForm();
          this.clickButton('close');
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Erreur lors de l\'ajout de la proposition');
        }
      );
    }
  }

  acceptProposition(idProposition: number): void {
    if (idProposition === undefined || idProposition === null) {
      console.error('idProposition is undefined or null');
      return;
    }
    this.propositionOffreService.acceptPropositionOffre(idProposition).subscribe(
      (PropositionOffre) => {
        this.notificationService.notify(NotificationType.SUCCESS, 'Proposition accepted successfully');
        this.getPropositionOffres();
        this.clickButton('close')
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, `Failed to accept proposition: ${error.message}`);
      }
    );
  }



  refuseProposition(idProposition: number): void {
    this.propositionOffreService.rejectPropositionOffre(idProposition).subscribe(
      () => {
        this.notificationService.notify(NotificationType.SUCCESS, 'Proposition refuseed successfully');
        this.getPropositionOffres()
      },
      (error) => {
        this.notificationService.notify(NotificationType.SUCCESS, 'faild to refuse proposition');

      }
    );
  }









  rejectProposition(idProposition: number): void {
    this.propositionOffreService.rejectPropositionOffre(idProposition).subscribe(
      (response: PropositionOffre) => {
        this.notificationService.notify(NotificationType.SUCCESS, 'Proposition refusée avec succès');
        this.getPropositionOffres();
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, 'Erreur lors du rejet de la proposition');
      }
    );
  }

  

  deletePropositionoffre(idProposition: number): void {
    if (confirm('Are you sure you want to delete this proposition?')) {
      this.propositionOffreService.deletePropositionOffre(idProposition).subscribe(
        () => {
          this.notificationService.notify(NotificationType.SUCCESS, 'Proposition supprimée avec succès');
          this.getPropositionOffres();
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Erreur lors de la suppression de la proposition');
        }
      );
    }
  }






  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updaterec(editFormationForm: NgForm): void {
  

    const formValue = editFormationForm.value;
  
   
  
    const formData: FormData = this.propositionOffreService.createMouvementFormData(formValue);
  
    if (editFormationForm.valid) {
      this.subscriptions.push(
        this.propositionOffreService.updateoffre(formData).subscribe(
          (response: PropositionOffre) => {
            this.notificationService.notify(NotificationType.SUCCESS, 'planning updated successfully');
            this.getPropositionOffres();
            this.clickButton('new-proposition-close');
            
          },
          (errorResponse: HttpErrorResponse) => {
            this.notificationService.notify(NotificationType.ERROR, 'Failed to update planning');
          }
        )
      );
    }



  }

}