import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PropositionOffre } from '../model/PropositionOffre';

@Injectable({
  providedIn: 'root'
})
export class PropositionOffreService {
  private baseUrl = `${environment.apiUrl}/propositionOffres`;

  constructor(private http: HttpClient) { }

  getAllPropositionOffres(): Observable<PropositionOffre[]> {
    return this.http.get<PropositionOffre[]>(`${this.baseUrl}/getall`);
  }

  getPropositionOffreById(id: number): Observable<PropositionOffre> {
    return this.http.get<PropositionOffre>(`${this.baseUrl}/getone/${id}`);
  }

  addNewPropositionOffre(propOffreData: any): Observable<PropositionOffre> {
    const params = new HttpParams()
      .set('departement', propOffreData.departement)
      .set('jobTitle', propOffreData.jobTitle)
      .set('coutEmbauche', propOffreData.coutEmbauche)
      .set('duree', propOffreData.duree)
      .set('motifRecrutement', propOffreData.motifRecrutement)
      .set('dateLancement', propOffreData.dateLancement)
      .set('dateEmbauche', propOffreData.dateEmbauche)
      .set('recruteur', propOffreData.recruteur)
      .set('modeRecrutement', propOffreData.modeRecrutement);
    return this.http.post<PropositionOffre>(`${this.baseUrl}/add`, null, { params });
  }

 



  acceptPropositionOffre(idProposition: number): Observable<PropositionOffre> {
    if (idProposition === undefined || idProposition === null) {
      return throwError(() => new Error('idProposition is undefined or null'));
    }
    const params = new HttpParams().set('idProposition', idProposition.toString());
    return this.http.post<PropositionOffre>(`${this.baseUrl}/accept`, {}, { params });
  }
  

 
  rejectPropositionOffre(idProposition: number): Observable<PropositionOffre> {
    return this.http.post<PropositionOffre>(`${this.baseUrl}/reject`, null, {
      params: new HttpParams().set('idProposition', idProposition.toString())
    });
  }

  deletePropositionOffre(idProposition: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${idProposition}`);
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

  public createMouvementFormData(propositionFormation: any): FormData {
    const formData = new FormData();
    formData.append('idOffreProp', propositionFormation.idOffreProp);
    formData.append('departement', propositionFormation.departement);
    formData.append('jobTitre', propositionFormation.jobTitre);
    formData.append('coutEmbauche', propositionFormation.coutEmbauche);
    formData.append('duree', propositionFormation.duree);
    formData.append('motifRecretement', propositionFormation.motifRecretement);
    formData.append('dateLancement', this.formatDate(propositionFormation.dateLancement));
    formData.append('dateEmbauche', this.formatDate(propositionFormation.dateEmbauche));
    formData.append('recruteur', propositionFormation.recruteur);
    formData.append('modeRecrutement', propositionFormation.modeRecrutement);
    formData.append('statusPropo', propositionFormation.statusPropo);
  
   
    return formData;
  }

  updateoffre(formData: FormData): Observable<PropositionOffre> {
    return this.http.post<PropositionOffre>(`${this.baseUrl}/update`, formData);
  }


}
