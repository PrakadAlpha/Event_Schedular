import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from, forkJoin } from "rxjs";
import { Events } from "../modals/Events";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EventI } from '../modals/EventsI';

@Injectable({
  providedIn: "root"
})
export class EventsService {
  eventFormGroup: FormGroup;

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    appName: new FormControl("", Validators.required),
    environment: new FormControl("", Validators.required),
    eventName: new FormControl("", Validators.required),
    eventType: new FormControl("", Validators.required),
    eventDetails: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    startTime: new FormControl(Date, Validators.required),
    endTime: new FormControl(Date, Validators.required),
    level: new FormControl("", Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      appName: "",
      environment: "",
      eventName: "",
      eventType: "",
      eventDetails: "",
      startDate: "",
      endDate: "",
      startTime: Date,
      endTime: Date,
      level: ""
    });
  }

  allocate() {}

  populateForm(Event: Events) {
    this.form.setValue(Event);
  }

  //Getting Event By Id

  getEventId(id: number): Observable<Object> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });

    return this.http.get(`${this.baseUrl}/events/${id}`, { headers });
  }

  // Adding an Event

  addEvent(event: Object): Observable<Object> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });

    return this.http.post(`${this.baseUrl}` + `/events`, event, { headers });
  }

  //Listing events

  listEvent(): Observable<any> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });

    return this.http.get(`${this.baseUrl}` + `/events`, { headers });
  }

  //Update events

  updateEvent(event: Object): Observable<Object> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });

    return this.http.put(`${this.baseUrl}` + `/events`, event, { headers });
  }

  //Delete events

  deleteEvent(id: number): Observable<Object> {
    let username = "admin1";
    let password = "admin1";

    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });
    console.log(id);
    return this.http.delete(`${this.baseUrl}/events/${id}`, { headers });
  }

  //Get by Date
  getByDate(date: string): Observable<EventI[]> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });
    return this.http.get<EventI[]>(`${this.baseUrl}/events/event/${date}`, {
      headers
    });
  }

  // Generate Pdf
  getPdf(startDate: string, endDate: string): Observable<Blob> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });
    console.log(startDate);
    console.log(endDate);
    return this.http.get(
      `${this.baseUrl}` +
        `/events/report/` +
        `${startDate}` +
        `/` +
        `${endDate}`,
      { headers, responseType: "blob" }
    );
  }

  //Get the List by using the Range of dates 
  getByRange(startDate: string, endDate: string): Observable<EventI[]> {
    let username = "admin1";
    let password = "admin1";
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });
    return this.http.get<EventI[]>(
      `${this.baseUrl}` +
        `/events/range/` +
        `${startDate}` +
        `/` +
        `${endDate}`,
      { headers }
    );
  }
}
