import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const date = new Date(planning.dateRealisation);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    const params = new HttpParams()
      .set('module', planning.module)
      .set('departement', planning.departement)
      .set('date', formattedDate);
    return this.http.post<Planning>(`${this.apiUrl}/add`, {}, { params });
  }

 



  updatePlanning(id: number, formData: any): Observable<Planning> {
    const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  return this.http.post<Planning>(`${this.apiUrl}/update/${id}`, formData, { headers });
  
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


  updateplanning(formData: FormData): Observable<Planning> {
    return this.http.post<Planning>(`${this.apiUrl}/update`, formData);
  }

 


  public createMouvementFormData(propositionFormation: any,): FormData {
    const formData = new FormData();
    formData.append('idPlanning', propositionFormation.idPlanning);
    formData.append('module', propositionFormation.module);
    formData.append('departement', propositionFormation.departement);
    formData.append('type', propositionFormation.type);
    formData.append('categorie', propositionFormation.categorie);
    formData.append('demandeur', propositionFormation.demandeur);
    formData.append('posteProposerPar', propositionFormation.posteProposerPar);
    formData.append('cabinetproposer', propositionFormation.cabinetproposer);
    formData.append('objectif', propositionFormation.objectif);
    formData.append('activite', propositionFormation.activite);
    formData.append('formateur', propositionFormation.formateur);
    formData.append('observation', propositionFormation.observation);
    formData.append('budgetPrevisionnel', propositionFormation.budgetPrevisionnel);
    formData.append('budgetEstimatif', propositionFormation.budgetEstimatif );

    formData.append('statusPlanning', propositionFormation.statusPlanning );
    formData.append('coutreel', propositionFormation.coutreel );
    formData.append('evaluationChaud', propositionFormation.evaluationChaud );
    formData.append('evaluationFroid', propositionFormation.evaluationFroid );
    // Conversion des dates au format yyyy-MM-dd
    formData.append('dateRealisation', this.formatDate(propositionFormation.dateRealisation));


    return formData;
  }










  public deletePlanning(idPlanning: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idPlanning}`);
  }
  
}
