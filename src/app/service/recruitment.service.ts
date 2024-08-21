import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recruitment } from '../model/Recruitment';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private baseUrl = environment.apiUrl + '/recruitments';

  constructor(private http: HttpClient) { }
  getAllrec(): Observable<Recruitment[]> {
    return this.http.get<Recruitment[]>(`${this.baseUrl}/getall`);
  }

  convertCandidatToEmployee(idRecrutement: number): Observable<Employee> {
    const params = new HttpParams().set('idRecrutement', idRecrutement.toString());
    return this.http.post<Employee>(`${this.baseUrl}/convert`, null, { params });
  }
  updateRecruitment(idRecrutement: number, recruitment: any): Observable<Recruitment> {
    return this.http.put<Recruitment>(`${this.baseUrl}/update/${idRecrutement}`, recruitment);
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



  public createMouvementFormData(propositionFormation: any): FormData {
    const formData = new FormData();
    formData.append('idRecrutement', propositionFormation.idRecrutement);
    formData.append('departement', propositionFormation.departement);
    formData.append('recruteur', propositionFormation.recruteur);
    formData.append('nomCondidat', propositionFormation.nomCondidat);
    formData.append('commentaire', propositionFormation.commentaire);
    formData.append('dateDemandeRec', this.formatDate(propositionFormation.dateDemandeRec));
    formData.append('emploiDemandeType', propositionFormation.emploiDemandeType);
    formData.append('sourceType', propositionFormation.sourceType);
    formData.append('selectionPhase', propositionFormation.selectionPhase);
    formData.append('desisionType', propositionFormation.desisionType);
    formData.append('vueGestionaire', propositionFormation.vueGestionaire);
    formData.append('vueDecideur', propositionFormation.vueDecideur);
    formData.append('vueRh', propositionFormation.vueRh);
   
    


    return formData;
  }
  updaterec(formDataa: FormData): Observable<Recruitment> {
    return this.http.post<Recruitment>(`${this.baseUrl}/update`, formDataa);
  }
}
