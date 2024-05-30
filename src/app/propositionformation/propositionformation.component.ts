import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

import { PropositionFormationService } from '../service/proposition-formation.service';
import { NotificationType } from '../enum/notification-type.enum';
import { PropositionFormation } from '../model/PropositionFormation';
import { Formation } from '../model/Formation';
import { FormationService } from '../service/formation.service';

@Component({
  selector: 'app-proposition-formation',
  templateUrl: './propositionformation.component.html',
  styleUrls: ['./propositionformation.component.css']
})
export class Propositionformation implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public propositions: PropositionFormation[];
  public selectedProposition: PropositionFormation;
  public existingFormations: Formation[] = [];
  public refreshing: boolean;
  public showExistingFormations: boolean = false;
  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;

  constructor(private propositionService: PropositionFormationService, private formationService: FormationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getPropositions(true);
  }

  public saveNewProposition(): void {
    this.clickButton('new-proposition-save');
  }

  public editPropositionInfo(editProposition: PropositionFormation): void {
    this.clickButton('openPropositionEdit');
  }

  public getPropositions(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.propositionService.getAllPropositionFormations().subscribe(
        (response) => {
          this.propositions = response;
          this.refreshing = true;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Propositions loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load propositions');
        }
      )
    );
  }

  public searchPropositions(searchTerm: string): void {

  }

  addNewProposition(propositionForm: NgForm): void {
    if (propositionForm.valid) {
      this.propositionService.addNewPropositionFormation(
        propositionForm.value.module,
        propositionForm.value.type,
        propositionForm.value.categorie,
        propositionForm.value.description,
        propositionForm.value.proposePar,
        propositionForm.value.nbHeures
      ).subscribe(
        (response) => {
          this.sendNotification(NotificationType.SUCCESS, 'Proposition added successfully');
          this.getPropositions(false); // Refresh the proposition list
          document.getElementById('new-proposition-close').click(); // Close the modal
          propositionForm.resetForm(); // Clear the form
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add proposition');
        }
      );
    }
  }

  updateProposition(propositionForm: NgForm): void {
    if (propositionForm.valid && this.selectedProposition) {
      this.propositionService.updatePropositionFormation(
        this.selectedProposition.idProposition,
        propositionForm.value.module,
        propositionForm.value.type,
        propositionForm.value.categorie,
        propositionForm.value.description,
        propositionForm.value.proposePar,
        propositionForm.value.nbHeures,
        false // Assuming isAccepted is always false for editing
      ).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Proposition updated successfully');
          this.getPropositions(false); // Refresh the proposition list
          this.selectedProposition = null; // Reset selected proposition
          document.getElementById('edit-proposition-close')?.click(); // Close the modal
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update proposition');
        }
      );
    }
  }

  selectPropositionForEdit(proposition: PropositionFormation): void {
    this.selectedProposition = { ...proposition };
    this.clickButton('openPropositionEdit');
  }

  deleteProposition(propositionId: number): void {
    if (confirm('Are you sure you want to delete this proposition?')) {
      this.propositionService.deletePropositionFormation(propositionId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Proposition deleted successfully');
          this.getPropositions(false); // Refresh the proposition list
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete proposition');
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

  public selectProposition(selectedProposition: PropositionFormation): void {
    this.selectedProposition = selectedProposition;
    this.clickButton('openPropositionInfo');
  }
  acceptProposition(idProposition: number): void {
    this.propositionService.acceptPropositionFormation(idProposition).subscribe(
      () => {
        this.sendNotification(NotificationType.SUCCESS, 'Proposition accepted successfully');
        this.getPropositions(false); // Refresh the proposition list
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to accept proposition');
      }
    );
  }

  refuseProposition(idProposition: number): void {
    this.propositionService.refuserPropositionFormation(idProposition).subscribe(
      () => {
        this.sendNotification(NotificationType.SUCCESS, 'Proposition refused successfully');
        this.getPropositions(false); // Refresh the proposition list
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, 'Failed to refuse proposition');
      }
    );
  }

  private getExistingFormations(): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.formationService.getAllFormations().subscribe(
        (response: Formation[]) => {
          this.existingFormations = response;
          this.refreshing = false;
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load existing formations');
        }
      )
    );
  }

  toggleExistingFormations(): void {
    this.showExistingFormations = !this.showExistingFormations;
    if (this.showExistingFormations) {
      this.getExistingFormations();
    }
  }
}
