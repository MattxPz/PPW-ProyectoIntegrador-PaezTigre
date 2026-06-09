import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:1337/api';


  getProgramadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?populate=*`);
  }
}