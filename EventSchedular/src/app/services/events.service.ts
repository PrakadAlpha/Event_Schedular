import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  getEventId(id: number): Observable<Object>{
    return this.http.get(`${this.baseUrl}/events/{id}`);
  }

  addEvent(event: Object): Observable<Object>{

    let username = "admin1";
    let password = "admin1";

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.post(`${this.baseUrl}` + `/events`, event, {headers});
  } 
}
