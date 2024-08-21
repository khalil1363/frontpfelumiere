import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EffectifTotal } from '../model/EffectifTotal';

@Injectable({
  providedIn: 'root'
})
export class EffectifTotalService {
  private apiUrl = 'http://localhost:8080/api/effectifTotal'; // Adjust the URL if necessary

  constructor(private http: HttpClient) { }

  
  createEffectifTotal(effectifTotal: EffectifTotal): Observable<EffectifTotal> {
    return this.http.post<EffectifTotal>(this.apiUrl, effectifTotal);
  }

  // Read All
  getAllEffectifTotals(): Observable<EffectifTotal[]> {
    return this.http.get<EffectifTotal[]>(this.apiUrl);
  }

  // Read One
  getEffectifTotalById(id: number): Observable<EffectifTotal> {
    return this.http.get<EffectifTotal>(`${this.apiUrl}/${id}`);
  }

  // Update
  updateEffectifTotal(id: number, effectifTotal: EffectifTotal): Observable<EffectifTotal> {
    return this.http.put<EffectifTotal>(`${this.apiUrl}/${id}`, effectifTotal);
  }

  // Delete
  deleteEffectifTotal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
