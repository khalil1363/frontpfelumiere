import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stagier } from '../model/Stagier';
import { Employee } from '../model/Employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StagierService {
  private baseUrl = 'http://localhost:8080/api/stagiers';
  private host  = environment.apiUrl ;
  constructor(private http: HttpClient) { }


  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.host}/employees/list`);
  }

  getAllStagiers(): Observable<Stagier[]> {
    return this.http.get<Stagier[]>(`${this.baseUrl}/list`);
  }
  getSupervisorsByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:8080/api/employees/supervisors?name=${name}`);
 
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


  public addemployeesToLocalCache(employees :Employee[]) : void {
    localStorage.setItem('employees',JSON.stringify(employees));
  }
  
  public getemployeesFromLocalCache() : Employee [] {
    if (localStorage.getItem('employees')){
    return JSON.parse(localStorage.getItem('employees')) ;
   } 
  return null ;
  } 


  public addStagierToLocalCache(stagiers :Stagier[]) : void {
    localStorage.setItem('stagiers',JSON.stringify(stagiers));
  }
  
  public getStagierFromLocalCache() : Stagier [] {
    if (localStorage.getItem('stagiers')){
    return JSON.parse(localStorage.getItem('stagiers')) ;
   } 
  return null ;
  } 



}
