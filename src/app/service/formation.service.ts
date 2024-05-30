import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Formation } from '../model/Formation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = environment.apiUrl + '/formations'; 

  constructor(private http: HttpClient) { }

  // Get all formations
  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/list`)
      .pipe(
        tap(data => console.log('Formations fetched: ', data)),
        catchError(this.handleError)
      );
  }

  // Get formation by ID
  getFormationById(id: number): Observable<Formation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Formation>(url)
      .pipe(
        tap(data => console.log(`Formation fetched: ${data}`)),
        catchError(this.handleError)
      );
  }

  // Add new formation
  addFormation(formation: Formation): Observable<Formation> {
    const params = new HttpParams()
      .set('module', formation.module)
      .set('type', formation.type)
      .set('categorie', formation.categorie)
      .set('description', formation.description)
      .set('proposePar', formation.proposePar)
      .set('nbHeures', formation.nbHeures);

    return this.http.post<Formation>(`${this.apiUrl}/add`, null, { params })
      .pipe(
        tap(data => console.log('Formation added: ', data)),
        catchError(this.handleError)
      );
  }

  // Update existing formation
  updateFormation(id: number, formation: Formation): Observable<Formation> {
    const params = new HttpParams()
      .set('idFormation', id.toString())
      .set('module', formation.module)
      .set('type', formation.type)
      .set('categorie', formation.categorie)
      .set('description', formation.description)
      .set('proposePar', formation.proposePar)
      .set('nbHeures', formation.nbHeures);

    return this.http.post<Formation>(`${this.apiUrl}/update`, null, { params })
      .pipe(
        tap(data => console.log(`Formation updated: ${data}`)),
        catchError(this.handleError)
      );
  }

  // Delete formation
  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        tap(() => console.log(`Formation deleted: ${id}`)),
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
