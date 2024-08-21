import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

import { PropositionFormationService } from '../service/proposition-formation.service';
import { NotificationType } from '../enum/notification-type.enum';
import { PropositionFormation } from '../model/PropositionFormation';
import { Formation } from '../model/Formation';
import { FormationService } from '../service/formation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Employee } from '../model/Employee';

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
  allEmployees: { name: string }[] = [];
  pl=new PropositionFormation();
  
///////////



listOfOption: Array<{ label: string; value: string }> = [];
size: NzSelectSizeType = 'default';
singleValue = 'a10';
multipleValue = ['a10', 'c12'];
tagValue = [];

/////



  constructor(private propositionService: PropositionFormationService, private formationService: FormationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getPropositions(true);

    this.propositionService.getAllEmployees().subscribe(
      (employees) => {
        this.allEmployees = employees;
      },
      (error) => {
        console.error('Failed to fetch employees', error);
      }
    );


  

    this.getemploye(true)

  }
  

  public saveNewProposition(): void {
    this.clickButton('new-proposition-save');
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






  public getemploye(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.propositionService.getAllEmployees().subscribe(
        (response) => {
          const children: Array<{ label: string; value: string }> = [];
          response.forEach((emp: Employee) =>{
            children.push({ label: emp.nomPrenom, value: emp.nomPrenom });

          })
          this.listOfOption = children;

          this.refreshing = true;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'empl loaded successfully');
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

  addNewPropositionFormation(propositionFormationForm: NgForm): void {
    if (this.tagValue.length == 0) {
      return console.log("t3ada")
    }

    const formValue = propositionFormationForm.value;
  
    // Convert selected employees to an array if it's a string
    if (typeof formValue.employeeNames === 'string') {
      formValue.employeeNames = this.tagValue.join(",")
    }
  
    const formData: FormData = this.propositionService.createMouvementFormData(formValue);
  
    if (propositionFormationForm.valid) {
      this.subscriptions.push(
        this.propositionService.addPropositionFormation(formData).subscribe(
          (response: PropositionFormation) => {
            this.sendNotification(NotificationType.SUCCESS, 'PropositionFormation added successfully');
            propositionFormationForm.resetForm();
            this.clickButton('new-proposition-close');
            this.getPropositions(true);
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to add PropositionFormation');
          }
        )
      );
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'ACCEPTED':
        return 'status-accepted';
      case 'REJECTED':
        return 'status-rejected';
      case 'EN_ATTENTE':
        return 'status-enattente';
      default:
        return '';
    }
  }

 

  selectPropositionForEdit(proposition: PropositionFormation): void {
    this.pl = proposition;
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
      (propositionFormation) => {
        this.sendNotification(NotificationType.SUCCESS, 'Proposition accepted successfully');
        this.getPropositions(false); // Assuming getPropositions is a method to refresh the list
      },
      (error) => {
        this.sendNotification(NotificationType.ERROR, `Failed to accept proposition: ${error.message}`);
      }
    );
  }

  


  updateProposition(propositionFormationForm: NgForm): void {
    const formValue = propositionFormationForm.value;
  
    if (typeof formValue.employeeNames === 'string') {
      formValue.employeeNames = formValue.employeeNames.split(',').map(name => name.trim());
    }
  
    if (propositionFormationForm.valid) {
      this.subscriptions.push(
        this.propositionService.updatePropositionFormation(this.selectedProposition.idProposition, formValue).subscribe(
          (response: PropositionFormation) => {
            this.sendNotification(NotificationType.SUCCESS, 'PropositionFormation updated successfully');
            this.getPropositions(true);
            this.clickButton('closeEditPropositionModal');
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update PropositionFormation');
          }
        )
      );
    }
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

 
  updateprop(editPropositionForm: NgForm): void {
  

    const formValue = editPropositionForm.value;
  
   
  
    const formData: FormData = this.propositionService.createMouvementFormDataa(formValue);
  
    if (editPropositionForm.valid) {
      this.subscriptions.push(
        this.propositionService.updateprop(formData).subscribe(
          (response: PropositionFormation) => {
            this.sendNotification(NotificationType.SUCCESS, 'planning updated successfully');
            this.getPropositions(true);
            this.clickButton('new-proposition-close');
            
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update planning');
          }
        )
      );
    }
  }
  



}
