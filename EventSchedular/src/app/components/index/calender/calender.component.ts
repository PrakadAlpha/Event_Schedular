import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";
import { EventsService } from "src/app/services/events.service";
import { DatePipe, Time } from "@angular/common";

export interface CalendarEvent {
  mDate?: moment.Moment;
  selected?: boolean;
  today?: boolean;
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
  dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  weeks: CalendarEvent[][] = [];
  sortedDates: CalendarEvent[] = [];
  // event: EventI[] = [];
  // events: EventI[] = [];
  event: CalendarEvent[] = [];
  events: CalendarEvent[] = [];

  @Input() selectedDates: CalendarEvent[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarEvent>();

  constructor(private service: EventsService, private DatePipe: DatePipe) {}

  ngOnInit() {
    this.generateCalender();
  }

  //Actions

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "months");
    this.generateCalender();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, "months");
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
    this.onSelectDate.emit(date);
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

  generateCalender(): void {
    const dates = this.fillDates(this.currentDate);
    console.log(dates);
    
    const weeks: CalendarEvent[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
    const values = this.fillValues(dates);
    console.log(values);
  }

  fillDates(currentMoment: moment.Moment): CalendarEvent[] {
    const firstOfMonth = moment(currentMoment)
      .startOf("month")
      .day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days");
    const start = firstDayOfGrid.date();

    return _.range(start, start + 42)
    .map((date: number): CalendarEvent => {
        const d1 = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d1),
          selected: this.isSelected(d1),
          mDate: d1
        };
      }
    );
  }

  fillValues(dates: CalendarEvent[]) {
    const mappedValues = async () => {
      const fetchedVal = await this.mapValues(dates);

      // for (const i in fetchedVal) {
      //   if (fetchedVal.hasOwnProperty(i)) {
      //    const element = fetchedVal[i];
      //      this.events.push(element);
      //    }
      //  }

      console.log(fetchedVal);

      fetchedVal.map(
        (values): CalendarEvent => {
          console.log(values.appName);

          return {
            id: values.id,
            appName: values.appName,
            environment: values.environment,
            startDate: values.startDate,
            endDate: values.endDate,
            eventName: values.eventName,
            eventType: values.eventType,
            eventDetails: values.eventDetails,
            startTime: values.startTime,
            endTime: values.endTime,
            level: values.level
          };
        }
      );
    };

    mappedValues();

    console.log("Main line");
  }

  mapValues(values: CalendarEvent[]): CalendarEvent[] {
    
    values.forEach(data => {
      const date = data.mDate.format("YYYY-MM-DD");

      this.service.getByDate(date).subscribe(dataList => {
        for (const i in dataList) {
          if (dataList.hasOwnProperty(i)) {
            const element = dataList[i];
            this.events.push(element);
          }
        }
      });
    });
    return this.events;
  }
}
