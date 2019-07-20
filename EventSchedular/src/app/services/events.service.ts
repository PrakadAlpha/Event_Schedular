import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalendarEvent } from '../components/index/calender/calender.component';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventFormGroup : FormGroup;

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { 
  }
  
 form: FormGroup = new FormGroup({
     id: new FormControl(null),
     appName: new FormControl('', Validators.required),
     environment: new FormControl('', Validators.required),
     eventName: new FormControl('', Validators.required),
     eventType: new FormControl('', Validators.required),
     eventDetails: new FormControl('', [Validators.required, Validators.minLength(8)]),
     startDate: new FormControl('', Validators.required),
     endDate: new FormControl('', Validators.required)
   })

   initializeFormGroup() {
    this.form.setValue({
      id: null,
      appName: '',
      environment: '',
      eventName: '',
      eventType: '',
      eventDetails: '',
      startDate: '',
      endDate: ''
    });
  }

  allocate(){
   
  }

  populateForm(Event){
    this.form.setValue(Event);
  }

  //Getting Event By Id

  getEventId(id: number): Observable<Object>{
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.get(`${this.baseUrl}/events/${id}`, {headers});
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
    console.log(id);
    return this.http.delete(`${this.baseUrl}/events/${id}`, {headers});
  }

  getByDate(date: string): Observable<CalendarEvent[]>{
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
   return this.http.get<CalendarEvent[]>(`${this.baseUrl}/events/event/${date}`, {headers});
   }

  // Generate Pdf

  getPdf(startDate: string, endDate: string): Observable<Blob>{
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    console.log(startDate);
    console.log(endDate);        
    return this.http.get(`${this.baseUrl}` + `/events/report/` + `${startDate}` + `/` + `${endDate}`, {headers, responseType:'blob'});
  }

}
