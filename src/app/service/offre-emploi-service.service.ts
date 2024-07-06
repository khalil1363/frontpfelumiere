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

  updateOffreEmploi(id: number, offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    return this.http.put<OffreEmploi>(`${this.baseUrl}/${id}`, offreEmploi);
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
}
