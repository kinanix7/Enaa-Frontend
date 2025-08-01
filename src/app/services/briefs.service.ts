import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Briefs {
   id: number;
   title: string;
   description: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BriefsService {


  Briefs: Briefs[] = [];
  private apiUrl = 'https://api.example.com/briefs'; 


  constructor(private http:HttpClient) { }

  getBriefs():Observable<Briefs[]> {
    return this.http.get<Briefs[]>('https://api.example.com/briefs');
  }
  getBriefById(id: number): Observable<Briefs> {
    return this.http.get<Briefs>(`${this.apiUrl}/${id}`);
  }
  createBrief(brief: Briefs): Observable<Briefs> {
    return this.http.post<Briefs>(this.apiUrl, brief);
  }
  updateBrief(id: number, brief: Briefs): Observable<Briefs> {
    return this.http.put<Briefs>(`${this.apiUrl}/${id}`, brief);
  }
  deleteBrief(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}
