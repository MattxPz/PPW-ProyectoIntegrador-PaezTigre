import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  private http = inject(HttpClient);
  
  private apiUrl = 'https://healing-event-664102f8e1.strapiapp.com/api';


  getProgramadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/programadors?populate=*`);
  }
}