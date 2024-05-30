import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planning } from '../model/Planning';


@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private apiUrl = 'http://localhost:8080/api/planning';

  constructor(private http: HttpClient) {}

  public getAllPlannings(): Observable<Planning[]> {
    return this.http.get<Planning[]>(`${this.apiUrl}/list`);
  }

  public addPlanning(planning: Planning): Observable<Planning> {
    const date = new Date(planning.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    const params = new HttpParams()
      .set('idFormation', planning.idFormation.toString())
      .set('module', planning.module)
      .set('departement', planning.departement)
      .set('fonction', planning.fonction)
      .set('feedback', planning.feedback)
      .set('date', formattedDate);

    return this.http.post<Planning>(`${this.apiUrl}/add`, {}, { params });
  }

  public updatePlanning(planning: Planning): Observable<Planning> {
    const date = new Date(planning.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    const params = new HttpParams()
      .set('idPlanning', planning.idPlanning.toString())
      .set('module', planning.module)
      .set('departement', planning.departement)
      .set('fonction', planning.fonction)
      .set('feedback', planning.feedback)
      .set('date', formattedDate);

    return this.http.post<Planning>(`${this.apiUrl}/update`, {}, { params });
  }

  public deletePlanning(idPlanning: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idPlanning}`);
  }
  
}
