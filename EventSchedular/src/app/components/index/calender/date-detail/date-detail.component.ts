import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalenderComponent } from '../calender.component';
import { EventsService } from 'src/app/services/events.service';
import { CalendarEvent } from 'src/app/modals/CalendarEvent';
import { EventI } from 'src/app/modals/EventsI';
import * as _ from "lodash";


@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.component.html',
  styleUrls: ['./date-detail.component.sass']
})
export class DateDetailComponent implements OnInit {

  date: CalendarEvent;
  events: EventI[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: CalendarEvent, private dialogRef: MatDialogRef<CalenderComponent>,private service: EventsService) { 

    this.date = data
  }

  ngOnInit() {
    const date = this.date.mDate.format("YYYY-MM-DD");
    this.service.getByDate(date).subscribe(dataList => {

      for (const i in dataList) {
        if (dataList.hasOwnProperty(i)) {
          const element = dataList[i];
          this.events.push(element as EventI);
          this.events = _.uniqWith(this.events, _.isEqual);
        }
      }
      
    })
  }

  //Closing the dialog
  onClose() {
    this.dialogRef.close();
  }
}
