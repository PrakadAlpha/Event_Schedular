import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/modals/Events';
import { EventsService } from 'src/app/services/events.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.sass']
})
export class EventFormComponent implements OnInit {

  event: Events = new Events();

  eventFormGroup: FormGroup;

  submitted = false;

  appName = ['PGP', 'WEBCASH', 'BRIDGER', 'EM', 'SWIFT', 'TRAX'];
  environment = ['Prod', 'Dev', 'Qa'];
  eventName = ['Stable Changes', 'Development', 'Pipeline'];
  eventType = ['Deploy', 'Patch', 'Freeze'];


  constructor(private events: EventsService, private fb: FormBuilder) {
    this.eventFormGroup = this.createGroup();
   }

  ngOnInit() {
  }


//Form Group
createGroup(){
  return  new FormGroup({
   $key: new FormControl(null),
   appName: new FormControl(''),
   environment: new FormControl(''),
   eventName: new FormControl(''),
   eventType: new FormControl(''),
   eventDetails: new FormControl(),
   startDate: new FormControl(),
   endDate: new FormControl()
 })
};

//Subscribe and send data to service
  save(){
    this.events.addEvent(this.event)
               .subscribe(data => console.log(data), 
                          error => console.log(error));
               this.event = new Events();  
     }

//Call save method after submit
  onSubmit(){
    this.submitted = true;
    this.save();    
  }


}
