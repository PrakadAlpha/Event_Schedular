import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Events } from 'src/app/modals/Events';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;

  event: Events = new Events();

  datasource: MatTableDataSource<any>;
  
  displayedColumns: string[] = [
    "appName",
    "environment",
    "eventName",
    "eventType",
    "eventDetails",
    "startDate",
    "endDate",
    "startTime",
    "endTime",
    "level",
  ];


  constructor(private service: EventsService) { }

  ngOnInit() {
    this.service.listEvent().subscribe(
      data => {
        let listData = data.map((list: any) => {
          return list;
        });
        this.datasource = new MatTableDataSource(listData);
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;
      },
      error => console.log(error)
    );
  }

  load() {
    location.reload();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }


}
