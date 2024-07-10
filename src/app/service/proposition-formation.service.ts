import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PropositionFormation } from '../model/PropositionFormation';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/Employee';
@Injectable({
  providedIn: 'root'
})
export class PropositionFormationService {
  private tt = environment.apiUrl + '/employees';
  private baseUrl = environment.apiUrl + '/propositionsformations'; 
  constructor(private http: HttpClient) {}
  getAllPropositionFormations(): Observable<PropositionFormation[]> {
    return this.http.get<PropositionFormation[]>(`${this.baseUrl}/list`);
  }
  
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tt}/list`);
  }

  getEmployeeByMat(mat: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.tt}/mat/${mat}`);
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




  addPropositionFormation(formData: FormData): Observable<PropositionFormation> {
    return this.http.post<PropositionFormation>(`${this.baseUrl}/add`, formData);
  }

  public createMouvementFormData(propositionFormation: any): FormData {
    const formData = new FormData();

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