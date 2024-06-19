import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PropositionFormation } from '../model/PropositionFormation';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PropositionFormationService {
  private baseUrl = environment.apiUrl + '/propositionsformations'; 
  constructor(private http: HttpClient) {}
  getAllPropositionFormations(): Observable<PropositionFormation[]> {
    return this.http.get<PropositionFormation[]>(`${this.baseUrl}/list`);
  }
  
 

  // Méthode pour formater la date au format yyyy-MM-dd
  formatDate(date: Date): string {
    // Ensure 'date' is a valid Date object
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    // Format the date as yyyy-MM-dd
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  // Méthode pour envoyer le FormData au backend
  addPropositionFormation(formData: FormData): Observable<PropositionFormation> {
    return this.http.post<PropositionFormation>(`${this.baseUrl}/add`, formData);
  }

  // Méthode pour créer un FormData à partir de l'objet propositionFormation
  public createMouvementFormData(propositionFormation: any): FormData {
    const formData = new FormData();

    // Ajout de chaque champ au FormData
    formData.append('module', propositionFormation.module);
    formData.append('type', propositionFormation.type);
    formData.append('categorie', propositionFormation.categorie);
    formData.append('description', propositionFormation.description);
    formData.append('proposePar', propositionFormation.proposePar);
    formData.append('posteProposerPar', propositionFormation.posteProposerPar);
    formData.append('cabinetpropo', propositionFormation.cabinetpropo || '');
    formData.append('departement', propositionFormation.departement);
    formData.append('objectif', propositionFormation.objectif);
    formData.append('activite', propositionFormation.activite);
    formData.append('observation', propositionFormation.observation || '');
    formData.append('formateurPropose', propositionFormation.formateurPropose || '');

    // Conversion des dates au format yyyy-MM-dd
    formData.append('prdSouhaite', this.formatDate(propositionFormation.prdSouhaite));
    formData.append('DateCreation', this.formatDate(propositionFormation.DateCreation));

    // Ajout de chaque élément de employeeNames individuellement
    if (propositionFormation.employeeNames) {
      propositionFormation.employeeNames.forEach((name: string) => {
        formData.append('employeeNames', name);
      });
    }

    return formData;
  }

  updatePropositionFormation(idProposition: number, module: string, type: string, categorie: string, description: string, proposePar: string, nbHeures: string, isAccepted: boolean): Observable<PropositionFormation> {
    const params = new HttpParams()
      .set('idProposition', idProposition.toString())
      .set('module', module)
      .set('type', type)
      .set('categorie', categorie)
      .set('description', description)
      .set('proposePar', proposePar)
      .set('isAccepted', isAccepted.toString());
    return this.http.post<PropositionFormation>(`${this.baseUrl}/update`, {}, { params });
  }

  
 
  acceptPropositionFormation(idProposition: number): Observable<PropositionFormation> {
    const params = new HttpParams().set('idProposition', idProposition.toString());
    return this.http.post<PropositionFormation>(`${this.baseUrl}/accept`, {}, { params });
  }
  
  refuserPropositionFormation(idProposition: number): Observable<PropositionFormation> {
    const params = new HttpParams().set('idProposition', idProposition.toString());
    return this.http.post<PropositionFormation>(`${this.baseUrl}/refuser`, {}, { params });
  }


  deletePropositionFormation(idProposition: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${idProposition}`);
  }
}