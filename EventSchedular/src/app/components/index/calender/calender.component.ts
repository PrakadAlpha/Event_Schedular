import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";
import { EventsService } from "src/app/services/events.service";
import { DatePipe, Time } from "@angular/common";
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DateDetailComponent } from './date-detail/date-detail.component';

export interface CalendarEvent {
  mDate?: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

export interface EventI {
  id?: number;
  appName?: string;
  environment?: string;
  startDate?: Date;
  endDate?: Date;
  eventName?: string;
  eventType?: string;
  eventDetails?: string;
  startTime?: Time;
  endTime?: Time;
  level?: string;
}

@Component({
  selector: "app-calender",
  templateUrl: "./calender.component.html",
  styleUrls: ["./calender.component.sass"]
})
export class CalenderComponent implements OnInit {
  currentDate = moment();
  secondDate = moment(this.currentDate).add(1, "months");
  thirdDate = moment(this.secondDate).add(1, "months");
  dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  weeks: CalendarEvent[][] = [];
  sortedDates: CalendarEvent[] = [];
  events: EventI[] = [];
  event: EventI[] = [];
  dates: string[];
  spinner = false;
  passDate: CalendarEvent;

  @Input() dropList: string[];
  @Input() selectedDates: CalendarEvent[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarEvent>();

  constructor(private service: EventsService, private dialog: MatDialog, private DatePipe: DatePipe) {}

  ngOnInit() {
    this.generateCalender();
  }

  //Actions

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "months");
    this.secondDate = moment(this.currentDate).subtract(1, "months");
    this.thirdDate = moment(this.secondDate).subtract(1, "months");
    this.generateCalender();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, "months");
    this.secondDate = moment(this.currentDate).add(1, "months");
    this.thirdDate = moment(this.secondDate).add(1, "months");
    this.generateCalender();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "years");
    this.generateCalender();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, "years");
    this.generateCalender();
  }

  //Checkers

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  selectDate(date: CalendarEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = date;
    this.dialog.open(DateDetailComponent, dialogConfig);
    
  }

  isSelected(date: moment.Moment): boolean {
    return (
      _.findIndex(this.selectedDates, selectedDate => {
        return moment(date).isSame(selectedDate.mDate, "day");
      }) > -1
    );
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, "month");
  }


  //Generator

  generateCalender() {
    this.spinner = true;
    const dates = this.fillDates(this.currentDate);
    const dateArr = dates.map(data => {
      return data.mDate.format("YYYY-MM-DD");
    });

    const weeks: CalendarEvent[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;

    const getData = async () => {
      await this.mapValues(dateArr);

      this.event = this.events.filter(i => {
        return this.dropList.includes(i.appName);
      }); 
      this.spinner = false;
    };

    getData();
  }

  // mapValues(){
  //   this.service.getByDate("2019-07-25").subscribe(data => {

  //           const event = data as EventI[];
  //           console.log(event);
  //           return event;
  //   })

  // }

  mapValues(dates: string[]) {
    dates.forEach(date => {
      this.service.getByDate(date).subscribe(dataList => {
        if (dataList.length) {
          for (const i in dataList) {
            if (dataList.hasOwnProperty(i)) {
              const element = dataList[i];
              this.events.push(element as EventI);
              this.events = _.uniqWith(this.events, _.isEqual);
            }
          }
        }
      });
    });
  }

  fillDates(currentMoment: moment.Moment): CalendarEvent[] {
    const firstOfMonth = moment(currentMoment)
      .startOf("month")
      .day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days");
    const start = firstDayOfGrid.date();

    return _.range(start, start + 70).map(
      (date: number): CalendarEvent => {
        const d1 = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d1),
          selected: this.isSelected(d1),
          mDate: d1
        };
      }
    );
  }

}
