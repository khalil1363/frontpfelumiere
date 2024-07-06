import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recruitment } from '../model/Recruitment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private baseUrl = environment.apiUrl + '/recruitments';

  constructor(private http: HttpClient) { }
  getAllrec(): Observable<Recruitment[]> {
    return this.http.get<Recruitment[]>(`${this.baseUrl}/getall`);
  }
}
