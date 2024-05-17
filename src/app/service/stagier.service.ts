import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stagier } from '../model/Stagier';
import { Employee } from '../model/Employee';


@Injectable({
  providedIn: 'root'
})
export class StagierService {
  private baseUrl = 'http://localhost:8081/api/stagiers';

  constructor(private http: HttpClient) { }

  getAllStagiers(): Observable<Stagier[]> {
    return this.http.get<Stagier[]>(this.baseUrl);
  }
  getSupervisorsByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:8081/api/employees/supervisors?name=${name}`);
    // Adjust the endpoint and parameters as per your backend API
  }
  addStagier(stagierData: any): Observable<Stagier> {
    const params = new HttpParams()
      .set('nomPrenom', stagierData.nomPrenom)
      .set('institut', stagierData.institut)
      .set('diplome', stagierData.diplome)
      .set('specialite', stagierData.specialite)
      .set('cin', stagierData.cin)
      .set('tel', stagierData.tel)
      .set('superviseurMatricule', stagierData.superviseurMatricule)
      .set('stageRef', stagierData.stageRef);
    return this.http.post<Stagier>(`${this.baseUrl}/add`, null, { params });
  }

  updateStagier(idStagier: number, stagierData: any): Observable<Stagier> {
    const params = new HttpParams()
      .set('nomPrenom', stagierData.nomPrenom)
      .set('institut', stagierData.institut)
      .set('diplome', stagierData.diplome)
      .set('specialite', stagierData.specialite)
      .set('cin', stagierData.cin)
      .set('tel', stagierData.tel)
      .set('superviseurMatricule', stagierData.superviseurMatricule)
      .set('stageRef', stagierData.stageRef);
    return this.http.put<Stagier>(`${this.baseUrl}/update/${idStagier}`, null, { params });
  }

  deleteStagier(idStagier: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${idStagier}`);
  }
}
