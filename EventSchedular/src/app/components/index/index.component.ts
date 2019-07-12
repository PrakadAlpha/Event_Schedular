import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {

  // calendarPlugins = [dayGridPlugin]; 

  currentDate = moment();
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();
  

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
    // let p = document.createElement('p');
    // p.innerHTML = this.currentDate.toJSON();
    // document.querySelector('.calender').appendChild(p);
    this.generateCalender();
  }

  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log('Changed');
    
  //   if (changes.selectedDates &&
  //       changes.selectedDates.currentValue &&
  //       changes.selectedDates.currentValue.length  > 1) {

  //     // sort on date changes for better performance when range checking
  //   this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
  //   this.generateCalender();
  //   }
  // }

  //Actions

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalender();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalender(); 
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'years');
    this.generateCalender();
  }
  
  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'years');
    this.generateCalender();
  }

//Checkers

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

//Generator

  generateCalender(): void{
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    console.log(firstOfMonth);    
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    console.log(firstDayOfGrid);    
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
              };
            });
  }
  

}
