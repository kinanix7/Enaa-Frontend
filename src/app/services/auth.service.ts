import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Payload{
  name: string,
  email: string,
  password: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = "http://localhost:8084/api/v1/auth";


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  register(payload: Payload): Observable<Payload> {
    return this.http.post<Payload>(`${this.authUrl}/register`, payload);
  }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.authUrl}/login`, credentials);
  // }
}
