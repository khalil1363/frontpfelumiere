import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PropositionFormation } from '../model/PropositionFormation';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PropositionFormationService {
  private baseUrl = environment.apiUrl + '/propositionsformations'; // Use environment apiUrl
  constructor(private http: HttpClient) { }

  getAllPropositionFormations(): Observable<PropositionFormation[]> {
    return this.http.get<PropositionFormation[]>(`${this.baseUrl}/list`);
  }

  addNewPropositionFormation(module: string, type: string, categorie: string, description: string, proposePar: string, nbHeures: string): Observable<PropositionFormation> {
    const params = new HttpParams()
      .set('module', module)
      .set('type', type)
      .set('categorie', categorie)
      .set('description', description)
      .set('proposePar', proposePar)
      .set('nbHeures', nbHeures);

    return this.http.post<PropositionFormation>(`${this.baseUrl}/add`, {}, { params });
  }

  updatePropositionFormation(idProposition: number, module: string, type: string, categorie: string, description: string, proposePar: string, nbHeures: string, isAccepted: boolean): Observable<PropositionFormation> {
    const params = new HttpParams()
      .set('idProposition', idProposition.toString())
      .set('module', module)
      .set('type', type)
      .set('categorie', categorie)
      .set('description', description)
      .set('proposePar', proposePar)
      .set('nbHeures', nbHeures)
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
