import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/modals/Events';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { EventFormComponent } from './event-form/event-form.component';
import { Observable } from 'rxjs';

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


  events: Observable<Events>;


  displayedColumns: string[] = ['id', 'appName', 'environment', 'eventName', 'eventType', 'startDate', 'endDate', 'actions'];

  constructor(private service: EventsService, private dialog: MatDialog) {
  }


  load(){
    location.reload();
  }

  ngOnInit() {  
    this.service.listEvent().subscribe(data => {
      let listData = data.map(list =>{
        return list
      });
      this.datasource = new MatTableDataSource(listData);
      this.datasource.sort = this.sort; 
      this.datasource.paginator = this.paginator;
     },
  error => console.log(error)); 
    }  

 
                    

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    this.dialog.open(EventFormComponent, dialogConfig);
  }

  delete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteEvent(id)
      .subscribe(data => {
        console.log(data)
         this.ngOnInit()
      },
      error => console.log(error));
    }
  }
 

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onClick(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    this.dialog.open(EventFormComponent, dialogConfig);
  }
}
