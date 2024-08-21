import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OffreEmploi } from '../model/OffreEmploi';

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {
  private baseUrl = `${environment.apiUrl}/offresEmploi`;

  constructor(private http: HttpClient) { }

  getAllOffresEmploi(): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(`${this.baseUrl}/getall`);
  }

  getOffreEmploiById(id: number): Observable<OffreEmploi> {
    return this.http.get<OffreEmploi>(`${this.baseUrl}/${id}`);
  }

  addOffreEmploi(offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(`${this.baseUrl}/add`, offreEmploi);
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

  deleteOffreEmploi(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  acceptOffreEmploi(id: number): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(`${this.baseUrl}/accept`, { idProposition: id });
  }

  rejectOffreEmploi(id: number): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(`${this.baseUrl}/reject`, { idProposition: id });
  }



  public createMouvementFormData(propositionFormation: any): FormData {
    const formData = new FormData();
    formData.append('idOffreEmploi', propositionFormation.idOffreEmploi);
    formData.append('departement', propositionFormation.departement);
    formData.append('jobTitre', propositionFormation.jobTitre);
    formData.append('coutEmbauche', propositionFormation.coutEmbauche);
    formData.append('duree', propositionFormation.duree);
    formData.append('motifRecretement', propositionFormation.motifRecretement);
    formData.append('dateLancement', this.formatDate(propositionFormation.dateLancement));
    formData.append('dateEmbauche', this.formatDate(propositionFormation.dateEmbauche));
    formData.append('recruteur', propositionFormation.recruteur);
    formData.append('modeRecrutement', propositionFormation.modeRecrutement);
    formData.append('statusOffre', propositionFormation.statusOffre);
    
   
    
   
    return formData;
  }

  updateoffre(formData: FormData): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(`${this.baseUrl}/update`, formData);
  }




}
