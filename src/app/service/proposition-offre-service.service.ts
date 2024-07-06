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
}
