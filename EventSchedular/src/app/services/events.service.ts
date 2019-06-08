import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from '../modals/Events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  //Getting Event By Id

  getEventId(id: number): Observable<Object>{
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.get(`${this.baseUrl}/events/${id}`);
  }

  // Adding an Event

  addEvent(event: Object): Observable<Object>{

    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.post(`${this.baseUrl}` + `/events`, event, {headers});
  } 

  //Listing events

  listEvent(): Observable<any>{

    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.get(`${this.baseUrl}` + `/events`, {headers});
  } 

  //Update events

  updateEvent(event: Object): Observable<Object>{

    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.put(`${this.baseUrl}` + `/events`, event, {headers});
  } 

  //Delete events

  deleteEvent(id: number): Observable<Object>{
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.delete(`${this.baseUrl}/events/${id}`);
  }

}
