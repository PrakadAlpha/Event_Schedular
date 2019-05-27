import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/modals/Events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  event: Events = new Events();

  submitted = false;

  constructor(private events: EventsService) { }

  ngOnInit() {
  }

  save(){
    this.events.addEvent(this.event)
              .subscribe(data => console.log(data), error => console.log(error));
  
              this.event = new Events();
     }

  onSubmit(){
    this.submitted = true;
    this.save();    
  }
}
