import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../model/Candidat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private baseUrl = 'http://localhost:8080/api/candidats';
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}


  formatDate(date: string | Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  }
  getAllCandidats(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.host}/candidats/getall`);
  }

  getCandidatById(idCandidats: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.host}/candidats/${idCandidats}`);
  }

  
  addCandidat(candidatData: any): Observable<Candidat> {
    const formattedDate = this.formatDate(candidatData.date);
    const params = new HttpParams()
      .set('nomPrenom', candidatData.nomPrenom)
      .set('cin', candidatData.cin)
      .set('tel', candidatData.tel)
      .set('adresse', candidatData.adresse)
      .set('niveau', candidatData.niveau)
      .set('diplome', candidatData.diplome)
      .set('famille', candidatData.famille)
      .set('postPropose', candidatData.postPropose)
      .set('contact', candidatData.contact)
      .set('observation', candidatData.observation)
      .set('date', formattedDate)
      .set('offresEmploiIds', candidatData.offresEmploiIds);
      
      
    return this.http.post<Candidat>(`${this.host}/candidats/add`, null, { params });
  }

  


  updateCandidat(formData: FormData): Observable<Candidat> {
    return this.http.post<Candidat>(`${this.baseUrl}/update`, formData);
  }




  public createMouvementFormData(propositionFormation: any,): FormData {
    const formData = new FormData();
    formData.append('idCandidat', propositionFormation.idCandidat);
    formData.append('nomPrenom', propositionFormation.nomPrenom);
    formData.append('cin', propositionFormation.cin);
    formData.append('tel', propositionFormation.tel);
    formData.append('adresse', propositionFormation.adresse);
    formData.append('niveau', propositionFormation.niveau);
    formData.append('diplome', propositionFormation.diplome);
    formData.append('famille', propositionFormation.famille);
    formData.append('postPropose', propositionFormation.postPropose);
    formData.append('contact', propositionFormation.contact);
    formData.append('observation', propositionFormation.observation);
    formData.append('observation', propositionFormation.observation);
    formData.append('date', this.formatDate(propositionFormation.date));


    

    return formData;
  }





  deleteCandidat(idCandidats: number): Observable<any> {
    return this.http.delete(`${this.host}/candidats/${idCandidats}`);
  }

  public addCandidatsToLocalCache(candidats: Candidat[]): void {
    localStorage.setItem('candidats', JSON.stringify(candidats));
  }

  public getCandidatsFromLocalCache(): Candidat[] {
    if (localStorage.getItem('candidats')) {
      return JSON.parse(localStorage.getItem('candidats'));
    }
    return null;
  }
}