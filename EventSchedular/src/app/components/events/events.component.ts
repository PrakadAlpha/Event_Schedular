import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { EventsService } from "src/app/services/events.service";
import { Events } from "src/app/modals/Events";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { EventFormComponent } from "./event-form/event-form.component";
import { Observable } from "rxjs";
import { DatePipe, Time } from "@angular/common";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.sass"]
})
export class EventsComponent implements OnInit {
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  searchKey: string;

  event: Events = new Events();

  datasource: MatTableDataSource<any>;

  sDate: Date;
  eDate: Date;

  events: Observable<Events>;

  displayedColumns: string[] = [
    "appName",
    "environment",
    "eventName",
    "eventType",
    "startDate",
    "endDate",
    "startTime",
    "endTime",
    "level",
    "actions"
  ];

  constructor(
    private service: EventsService,
    private dialog: MatDialog,
    private DatePipe: DatePipe
  ) {}

  load() {
    location.reload();
  }

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

  onEdit(row: Events) {
    console.log(row);
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    this.dialog.open(EventFormComponent, dialogConfig);
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this record ?")) {
      this.service.deleteEvent(id).subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }

  onClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    this.dialog.open(EventFormComponent, dialogConfig);
  }

  genPdf() {
    let startDate = this.DatePipe.transform(this.sDate, "yyyy-MM-dd");
    let endDate = this.DatePipe.transform(this.eDate, "yyyy-MM-dd");

    this.service.getPdf(startDate, endDate).subscribe(
      data => {
        let nBlob = new Blob([data], { type: "application/pdf" });

        let downloadURL = window.URL.createObjectURL(nBlob);
        let link = document.createElement("a");
        link.href = downloadURL;
        link.download = "Event Report.pdf";
        link.click();

        console.log("pdf Downloaded");
      },
      error => console.log(error)
    );
  }
}
