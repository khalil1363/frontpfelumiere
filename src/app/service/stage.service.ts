// src/app/services/stage.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment
import { Stage } from '../model/Stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private baseUrl = environment.apiUrl + '/stages'; // Use environment apiUrl

  constructor(private http: HttpClient) {}

  getAllStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.baseUrl}/getall`);
  }

  getStageById(idStage: number): Observable<Stage> {
    return this.http.get<Stage>(`${this.baseUrl}/getone/${idStage}`);
  }

  addStage(stage: Stage): Observable<Stage> {
    return this.http.post<Stage>(`${this.baseUrl}/add`, stage);
  }

  updateStage(idStage: number, stage: Stage): Observable<Stage> {
    return this.http.put<Stage>(`${this.baseUrl}/update/${idStage}`, stage);
  }

  deleteStage(idStage: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${idStage}`);
  }
  public addStagesToLocalCache(stages :Stage[]) : void {
    localStorage.setItem('stages',JSON.stringify(stages));
  }
  
  public getStagesFromLocalCache() : Stage [] {
    if (localStorage.getItem('stages')){
    return JSON.parse(localStorage.getItem('stages')) ;
   } 
  return null ;
  } 
}
