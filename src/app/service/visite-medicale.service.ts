import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisiteMedicale } from '../model/Vesite';

@Injectable({
  providedIn: 'root'
})
export class VisiteMedicaleService {
  private apiUrl = 'http://localhost:8080/api/visitemedicale';
  private localCache: VisiteMedicale[] = [];

  constructor(private http: HttpClient) {}

  getAllVisitesMedicales(): Observable<VisiteMedicale[]> {
    return this.http.get<VisiteMedicale[]>(`${this.apiUrl}/list`);
  }

  addVisiteMedicale(visiteMedicale: any): Observable<VisiteMedicale> {
    return this.http.post<VisiteMedicale>(`${this.apiUrl}/add`, visiteMedicale);
  }

  updateVisiteMedicale(id: number, visiteMedicale: VisiteMedicale): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, visiteMedicale);
  }

  deleteVisiteMedicale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addVisitesMedicalesToLocalCache(visitesMedicales: VisiteMedicale[]): void {
    this.localCache = visitesMedicales;
  }

  getVisitesMedicalesFromLocalCache(): VisiteMedicale[] {
    return this.localCache;
  }
}
