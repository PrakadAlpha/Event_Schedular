import { Component, OnInit, Input, Inject } from '@angular/core';
import * as moment from "moment";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalenderComponent } from '../calender.component';
import { EventsService } from 'src/app/services/events.service';



export interface CalendarEvent {
  mDate?: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.component.html',
  styleUrls: ['./date-detail.component.sass']
})
export class DateDetailComponent implements OnInit {

  date: CalendarEvent;

  constructor(@Inject(MAT_DIALOG_DATA) data: CalendarEvent,     private dialogRef: MatDialogRef<CalenderComponent>,private service: EventsService) { 

    this.date = data
  }

  ngOnInit() {
    const date = this.date.mDate.format("YYYY-MM-DD");
    this.service.getByDate(date).subscribe(data => {

      console.log(data);
      
    })
  }



  onClose() {
    this.dialogRef.close();
  }



}
