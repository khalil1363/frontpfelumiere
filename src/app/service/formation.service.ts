import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Formation } from '../model/Formation';
import { environment } from 'src/environments/environment';
import { Planning } from '../model/Planning';
import { EffectifTotal } from '../model/EffectifTotal';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = environment.apiUrl + '/formations'; 
  private tt=environment.apiUrl+'/effectifTotal';
  constructor(private http: HttpClient) { }

  // Get all formations
  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/list`)
      .pipe(
        tap(data => console.log('Formations fetched: ', data)),
        catchError(this.handleError)
      );
  }


  addFormationToPlanning(idFormation: number): Observable<Planning> {
    const params = new HttpParams().set('idFormation', idFormation.toString());
    return this.http.post<Planning>(`${this.apiUrl}/addFormationToPlanning`, null, { params });
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
      .set('departement', formation.departement)
      .set('activite', formation.activite)

    return this.http.post<Formation>(`${this.apiUrl}/ajouter`, null, { params })
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

  // mta3 error
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }



  public createMouvementFormData(propositionFormation: any,): FormData {
    const formData = new FormData();
    formData.append('idFormation', propositionFormation.idFormation);
    formData.append('module', propositionFormation.module);
   
    formData.append('type', propositionFormation.type);
    formData.append('categorie', propositionFormation.categorie);

    formData.append('description', propositionFormation.description);
    formData.append('proposePar', propositionFormation.proposePar);
    formData.append('posteProposerPar', propositionFormation.posteProposerPar);
    formData.append('cabinetproposer', propositionFormation.cabinetproposer);
    formData.append('departement', propositionFormation.departement);
    formData.append('objectif', propositionFormation.objectif);
    formData.append('activite', propositionFormation.activite);
    formData.append('formateurPropose', propositionFormation.formateurPropose);
    formData.append('budgetEstimatif', propositionFormation.budgetEstimatif );

    formData.append('observation', propositionFormation.observation );
    formData.append('budgetPrevisionnel', propositionFormation.budgetPrevisionnel );


    return formData;
  }



  updateformation(formData: FormData): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/update`, formData);
  }



}
