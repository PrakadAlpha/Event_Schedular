import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";
import { EventsService } from "src/app/services/events.service";
import { DatePipe, Time } from "@angular/common";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface CalendarEvent {
  mDate?: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

export interface EventI{
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
  events: EventI[] = [];
  event: EventI[] = [];
  dates: string [] ;

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

  generateCalender() {
    const dates = this.fillDates(this.currentDate);
    console.log(dates.length);   
    const dateArr = dates.map(data => {
      return data.mDate.format("YYYY-MM-DD");
    });

    const weeks: CalendarEvent[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;

    const getData = async() => {
      
     await this.mapValues(dateArr);   

    }

    getData();    
    // this.mapValues();

    
  
    // const values = this.fillValues(dates);

    // console.log(date)

    // const values = this.mapValues(dateArr);

    // console.log(values);
  }
  // mapValues(){
  //   this.service.getByDate("2019-07-25").subscribe(data => {

  //           const event = data as EventI[];
  //           console.log(event);
  //           return event;
  //   })

  // }

    mapValues(dates: string[]){

     dates.forEach(date => {

     this.service.getByDate(date).subscribe((dataList) => {

        if(dataList.length){
          for (const i in dataList) {
            if (dataList.hasOwnProperty(i)) {
              const element = dataList[i];  
              this.events.push(element as EventI);
              this.events = _.uniqWith(this.events, _.isEqual)
              console.log(this.events);
            }
          }
        }

       
      })
     
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

    return _.range(start, start + 70)
    .map((date: number): CalendarEvent => {
        const d1 = moment(firstDayOfGrid).date(date);
        // this.service.getByDate(d2).subscribe(data => {
        //   this.events = data as CalendarEvent[];
        //   console.log(this.events);     
        // })    
        return {
          today: this.isToday(d1),
          selected: this.isSelected(d1),
          mDate: d1
        };
      }
    );
  }



  // fillValues(dates: CalendarEvent[]) {
  //   const mappedValues = async () => {
  //     const fetchedVal = await this.mapValues(dates);

  //     // for (const i in fetchedVal) {
  //     //   if (fetchedVal.hasOwnProperty(i)) {
  //     //    const element = fetchedVal[i];
  //     //      this.events.push(element);
  //     //    }
  //     //  }

  //     console.log(fetchedVal);

  //     fetchedVal.map(
  //       (values): EventI => {
  //         console.log(values.appName);

  //         return {
  //           id: values.id,
  //           appName: values.appName,
  //           environment: values.environment,
  //           startDate: values.startDate,
  //           endDate: values.endDate,
  //           eventName: values.eventName,
  //           eventType: values.eventType,
  //           eventDetails: values.eventDetails,
  //           startTime: values.startTime,
  //           endTime: values.endTime,
  //           level: values.level
  //         };
  //       }
  //     );
  //   };

  //   mappedValues();

  //   console.log("Main line");
  // }

  // mapValues(values: CalendarEvent[]) {
    
  //   console.log(values)

  //   values.forEach(data => {
     
  //     const date = data.mDate.format("YYYY-MM-DD")

  //    this.service.getByDate(date).subscribe((dataList): EventI[] => {
  //       for (const i in dataList) {
  //         if (dataList.hasOwnProperty(i)) {
  //           const element = dataList[i];
  //           this.events.push(element);
  //           return this.events;
  //         }
  //       }
  //     });
  //     console.log(this.events);
  //       });
  // }

  // mapValues(dates: string[]){

  //   dates.map((data) => {
  //    this.service.getByDate(data).subscribe(dataList => {
  //      if(dataList.length != undefined){
  //     for (const i in dataList) {
  //               if (dataList.hasOwnProperty(i)) {
  //                 const element = dataList[i];
  //                 this.events.push(element);
  //               }
  //             }
  //           }
  //     });
  //   })

  //   setTimeout(()=>{
  //     console.log(this.events);
  //   }, 3000)

  // }
}
