import { Component, OnInit } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';
import { Candidat } from '../model/Candidat';
import { CandidatService } from '../service/candidat.service';
import { NotificationService } from '../service/notification.service';
import { PropositionOffre } from '../model/PropositionOffre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropositionOffreService } from '../service/proposition-offre-service.service';
import { OffreEmploi } from '../model/OffreEmploi';
import { OffreEmploiService } from '../service/offre-emploi-service.service';




@Component({
  selector: 'app-offresEmploi',
  templateUrl: './offresEmploi.component.html',
  styleUrls: ['offresEmploi.component.css']
})

export class offresEmploiComponent implements OnInit {
  offresEmploi: OffreEmploi[];
  selectedOffre: OffreEmploi;
  form: FormGroup;
  offreEmploi:OffreEmploi[];
  isLoading = false;

  constructor(
    private offreEmploiService: OffreEmploiService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getOffresEmploi();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      departement: ['', Validators.required],
      jobTitre: ['', Validators.required],
      coutEmbauche: ['', Validators.required],
      duree: [''],
      motifRecretement: [''],
      dateLancement: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      recruteur: [''],
      modeRecretement: [''],
      statusOffre: ['']
      // Add more fields as per your form requirements
    });
  }

  getOffresEmploi(): void {
    this.isLoading = true;
    this.offreEmploiService.getAllOffresEmploi().subscribe(
      (response: OffreEmploi[]) => {
        this.offresEmploi = response;
        this.isLoading = false;
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, 'Failed to fetch offres emploi');
        this.isLoading = false;
      }
    );
  }

  selectOffre(offre: OffreEmploi): void {
    this.selectedOffre = offre;
  }

  addNewOffre(): void {
    if (this.form.valid) {
      this.offreEmploiService.addOffreEmploi(this.form.value).subscribe(
        (response: OffreEmploi) => {
          this.notificationService.notify(NotificationType.SUCCESS, 'Offre emploi ajoutée avec succès');
          this.getOffresEmploi();
          this.form.reset();
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Erreur lors de l\'ajout de l\'offre emploi');
        }
      );
    }
  }

  updateOffre(id: number): void {
    if (this.form.valid) {
      this.offreEmploiService.updateOffreEmploi(id, this.form.value).subscribe(
        (response: OffreEmploi) => {
          this.notificationService.notify(NotificationType.SUCCESS, 'Offre emploi mise à jour avec succès');
          this.getOffresEmploi();
          this.form.reset();
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Erreur lors de la mise à jour de l\'offre emploi');
        }
      );
    }
  }

  deleteOffre(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      this.offreEmploiService.deleteOffreEmploi(id).subscribe(
        () => {
          this.notificationService.notify(NotificationType.SUCCESS, 'Offre emploi supprimée avec succès');
          this.getOffresEmploi();
        },
        (error) => {
          this.notificationService.notify(NotificationType.ERROR, 'Erreur lors de la suppression de l\'offre emploi');
        }
      );
    }
  }

  acceptOffre(id: number): void {
    this.offreEmploiService.acceptOffreEmploi(id).subscribe(
      (response: OffreEmploi) => {
        this.notificationService.notify(NotificationType.SUCCESS, 'Offre emploi acceptée avec succès');
        this.getOffresEmploi();
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, 'Erreur lors de l\'acceptation de l\'offre emploi');
      }
    );
  }

  rejectOffre(id: number): void {
    this.offreEmploiService.rejectOffreEmploi(id).subscribe(
      (response: OffreEmploi) => {
        this.notificationService.notify(NotificationType.SUCCESS, 'Offre emploi refusée avec succès');
        this.getOffresEmploi();
      },
      (error) => {
        this.notificationService.notify(NotificationType.ERROR, 'Erreur lors du refus de l\'offre emploi');
      }
    );
  }
}