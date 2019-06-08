import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/modals/Events';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  event: Events = new Events();
  
  eventFormGroup: FormGroup;

  submitted = false;

  appName = ['PGP', 'WEBCASH', 'BRIDGER', 'EM', 'SWIFT', 'TRAX'];
  environment = ['Prod', 'Dev', 'Qa'];
  eventName = ['Stable Changes', 'Development', 'Pipeline'];
  eventType = ['Deploy', 'Patch', 'Freeze'];

  datasource : MatTableDataSource<any>;

  listData : Events[];

  displayedColumns: string[] = ['id', 'appName', 'environment', 'eventName', 'eventType', 'startDate', 'endDate', 'actions'];

  constructor(private events: EventsService, private fb: FormBuilder) {
      this.eventFormGroup = this.createGroup();
    }

  ngOnInit() {       
    this.list();
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

  update(){
    this.events.updateEvent(this.event)
                .subscribe(data => console.log(data),
                           error => console.log(error));
  }

  // this.datasouce = new MatTableDataSource(res);

  list(){
    return this.events.listEvent().subscribe(data => {this.listData = data;
    this.datasource = new MatTableDataSource(this.listData);
    this.datasource.sort = this.sort; 
    this.datasource.paginator = this.paginator;
    },
    error => console.log(error));
  }

  delete(){
    this.events.deleteEvent(this.event.id).subscribe(data => console.log(data),
                                        error => console.log(error));
  }

}
