import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, startWith } from 'rxjs';
import {  FormBuilder, FormControl, FormGroup, NgForm, Validators,  } from '@angular/forms';
import { NotificationType } from '../enum/notification-type.enum';
import { StagierService } from '../service/stagier.service';
import { NotificationService } from '../service/notification.service';
import { Stagier } from '../model/Stagier';
import { Employee } from '../model/Employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Stage } from '../model/Stage';
import { StageService } from '../service/stage.service';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { PropositionFormationService } from '../service/proposition-formation.service';

@Component({
  selector: 'app-stagier',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagierComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public stagiers: Stagier[];
  public selectedStagier: Stagier;
  public refreshing: boolean;
  public employees:Employee[];
  p: number = 1;
  itemsPerPage: number = 6;
  totalElements: any;

  form: FormGroup;
  
  supervisors: Employee[] = [];

 
  stages: Stage[] = [];
  stageReferenceControl = new FormControl();
  selectedStage: Stage;
  filteredStages: Observable<Stage[]>; 

/////////////////////////////////////////
listOfOption: Array<{ label: string; value: string }> = [];
size: NzSelectSizeType = 'default';
singleValue = 'a10';
multipleValue = ['a10', 'c12'];
tagValue = [];
allEmployees: { name: string }[] = [];
//////////////////////
list: Array<{ labell: string; valuee: string }> = [];
siz: NzSelectSizeType = 'default';
single = 'a10';
multiple = ['a10', 'c12'];
tag= [];

/////////////////
  filteredSupervisors: Observable<Employee[]>;
  supervisorControl = new FormControl();
  selectedSupervisor: Employee;
  constructor(private stagierService: StagierService,
               private notificationService: NotificationService 
               ,private httpClient: HttpClient,private fb: FormBuilder,
               private satgeService : StageService ,
               private propositionService: PropositionFormationService,
               
              ) { 
               }
  

              



             





  ngOnInit(): void {
    this.getStagiers(true);
    this.getEmployees(false);
    this.getStages(false);
    this.getstag(false);
    this.filteredSupervisors = this.supervisorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSupervisors(value))
    );
   
    this.form = this.fb.group({
      matricule: ['', Validators.required], // Added matricule control
      // Other form controls...
    });
    this.getemploye(true)
    this.filteredStages = this.stageReferenceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStages(value))
    );
  }
  public selectSupervisor(supervisor: Employee): void {
    this.selectedSupervisor = supervisor;
    this.form.get('superviseurMatricule').setValue(supervisor.mat);
  }
  private _filterSupervisors(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.supervisors.filter(supervisor =>
      supervisor.nomPrenom.toLowerCase().includes(filterValue)
    );
  }
 

  private _filterStages(value: string): Stage[] {
    const filterValue = value.toLowerCase();
    return this.stages.filter(stage =>
      stage.theme.toLowerCase().includes(filterValue)
    );
  }

  public selectStage(stage: Stage): void {
    this.selectedStage = stage;
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

  public getEmployees (showNotification : boolean ):void {
    this.refreshing = true ;
    this.subscriptions.push(
    this.stagierService.getAllEmployees().subscribe(
        (response : Employee[] ) => {
          this.stagierService.addemployeesToLocalCache(response);
          this.employees  = response ;
          this.supervisors = response;
          this.refreshing = false ;
          this.totalElements=response.length;
          if (showNotification){
            this.sendNotification(NotificationType.SUCCESS, `${response.length} Employee(s) loaded successfully . `) ;
          }
        },
        (errorResponse : HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR , errorResponse.error.message) ;
          this.refreshing = false ;
        }
      )
    );
  
  }




  public getStagiers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.stagierService.getAllStagiers().subscribe(
        (response: Stagier[]) => {
          this.stagiers = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'Stagiers loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load stagiers');
        }
      )
    );
  }
  



  public selectStagier(stagier: Stagier): void {
    this.selectedStagier = stagier;
    this.clickButton('openStagierInfo');
  }


  public addNewStagier(stagierForm: NgForm): void {
   
    if (stagierForm.valid) {
      this.stagierService.addStagier(stagierForm.value).subscribe(
        (response: Stagier) => {
          this.getStagiers(false);
          this.sendNotification(NotificationType.SUCCESS, 'Stagier added successfully');
         
          document.getElementById('new-stagier-close')?.click();
         
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to add stagier');
        }
      );
    }
  }
 
  public selectStagierForEdit(stagier: Stagier): void {
    this.clickButton('openStagierEdit');
  }

  public updateStagier(stagierForm: NgForm): void {
    if (stagierForm.valid && this.selectedStagier) {
      this.stagierService.updateStagier(this.selectedStagier.idStagier, stagierForm.value).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Stagier updated successfully');
          this.getStagiers(false);
          this.selectedStagier = null;
          document.getElementById('edit-stagier-close')?.click();
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to update stagier');
        }
      );
    }
  }
  public editFormationInfo(editFormation: Stagier): void {
    this.clickButton('openFormationEdit');
  }
  public deleteStagier(stagierId: number): void {
    if (confirm('Are you sure you want to delete this stagier?')) {
      this.stagierService.deleteStagier(stagierId).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, 'Stagier deleted successfully');
          this.getStagiers(false);
        },
        (error) => {
          this.sendNotification(NotificationType.ERROR, 'Failed to delete stagier');
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
    document.getElementById(buttonId)?.click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ///////////////////////////
  public getemploye(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.propositionService.getAllEmployees().subscribe(
        (response) => {
          const children: Array<{ label: string; value: string }> = [];
          response.forEach((emp: Employee) =>{
            children.push({ label: emp.nomPrenom, value: emp.mat });

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
  /////////////////////
 
  public getstag(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.satgeService.getAllStages().subscribe(
        (response) => {
          const childrenn: Array<{ labell: string; valuee: string }> = [];
          response.forEach((emp: Stage) =>{
            childrenn.push({ labell: emp.theme, valuee: emp.reference });

          })
          this.list = childrenn;

          this.refreshing = true;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, 'stage loaded successfully');
          }
        },
        (error) => {
          this.refreshing = false;
          this.sendNotification(NotificationType.ERROR, 'Failed to load stage');
        }
      )
    );
  }


  
  updaterec(editFormationForm: NgForm): void {
  

    const formValue = editFormationForm.value;
  
   
  
    const formData: FormData = this.stagierService.createMouvementFormData(formValue);
  
    if (editFormationForm.valid) {
      this.subscriptions.push(
        this.stagierService.updstage(formData).subscribe(
          (response: Stagier) => {
            this.sendNotification(NotificationType.SUCCESS, 'planning updated successfully');
            this.getStagiers(true);
            this.clickButton('new-proposition-close');
            
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, 'Failed to update planning');
          }
        )
      );
    }



  }
  //////////////////////
}
