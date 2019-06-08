import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/modals/Events';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  searchKey: string;

  event: Events = new Events();
  
  datasource : MatTableDataSource<any>;

  listData : Events[];

  displayedColumns: string[] = ['id', 'appName', 'environment', 'eventName', 'eventType', 'startDate', 'endDate', 'actions'];

  constructor(private events: EventsService, private dialog: MatDialog) {
    }

  ngOnInit() {  
    this.list();     
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
 

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onClick(){

    this.dialog.open(EventFormComponent);

  }
}
