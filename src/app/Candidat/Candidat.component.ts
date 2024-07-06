import { Component, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { Candidat } from '../model/Candidat';
import { CandidatService } from '../service/candidat.service';
import { NotificationService } from '../service/notification.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-Candidat',
  templateUrl: './Candidat.component.html',
  styleUrls: ['Candidat.component.css']
})

export class CandidatComponent implements OnInit {
  candidats: Candidat[];
  selectedCandidat: Candidat;
  refreshing: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private candidatService: CandidatService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getCandidats(true);
    
  }

  

  deleteCan(idCandidats: number): void {
    if (confirm('Are you sure you want to delete this stage?')) {
      this.candidatService.deleteCandidat(idCandidats).subscribe(
        () => {
          this.notificationService.notify(NotificationType.SUCCESS, 'delete done');
          this.getCandidats(false); 
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Failed to delete candidats.');
        }
      );
    }
  }

  public getCandidats(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.candidatService.getAllCandidats().subscribe(
        (response) => {
          this.candidats = response;
          this.refreshing = true;
          if (showNotification) {
            this.notificationService.notify(NotificationType.SUCCESS, 'Failed to fetch candidats.');
          }
        },
        (error) => {
          this.refreshing = false;
          this.notificationService.notify(NotificationType.ERROR, 'Failed to fetch candidats.');
        }
      )
    );
  }








  selectCandidat(candidat: Candidat): void {
    this.selectedCandidat = candidat;
    // Additional actions when selecting a candidat
  }

  formatDate(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  public addNewCandidate(candidateForm: NgForm): void {
    if (candidateForm.valid) {
      this.candidatService.addCandidat(candidateForm.value).subscribe(
        (response: Candidat) => {
          this.notificationService.notify(NotificationType.SUCCESS, ' candidat offres added');


          this.getCandidats(false);
          document.getElementById('new-stagier-close')?.click();
          candidateForm.resetForm();
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Failed to fetch proposition offres');
        }
      );
    }
  }










  deleteCandidat(id: number): void {
    if (confirm('Are you sure you want to delete this candidat?')) {
      this.candidatService.deleteCandidat(id).subscribe(
        () => {
          this.notificationService.notify(NotificationType.SUCCESS, 'Candidat deleted successfully.');
          this.getCandidats(false);
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Failed to delete candidat.');
        }
      );
    }
  }
}
