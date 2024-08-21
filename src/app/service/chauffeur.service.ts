import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chauffeur } from '../model/Chauffeur';
import { environment } from 'src/environments/environment';
import { EffectifTotal } from '../model/EffectifTotal';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  private baseUrl = environment.apiUrl+'/chauffeurs';

  constructor(private http: HttpClient) { }

  getAllChauffeurs(): Observable<Chauffeur[]> {
    return this.http.get<Chauffeur[]>(`${this.baseUrl}/list`);
  }

  getChauffeurById(id: number): Observable<Chauffeur> {
    return this.http.get<Chauffeur>(`${this.baseUrl}/${id}`);
  }

  createChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.post<Chauffeur>(`${this.baseUrl}/add`, chauffeur);
  }

  updateChauffeur(id: number, chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.put<Chauffeur>(`${this.baseUrl}/update/${id}`, chauffeur);
  }

  deleteChauffeur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
 

}
