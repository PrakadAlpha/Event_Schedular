import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  currentMonth = moment();
  currentYear = moment();
  

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
    // let p = document.createElement('p');
    // p.innerHTML = this.currentDate.toJSON();
    // document.querySelector('.calender').appendChild(p);
  }

  //Actions

  prevMonth(): void {
    this.currentMonth = moment(this.currentMonth).subtract(1, 'months');
    this.generateCalender();
  }

  nextMonth(): void {
    this.currentMonth = moment(this.currentMonth).add(1, 'months');
    this.generateCalender();
  }

  prevYear(): void {
    this.currentYear = moment(this.currentYear).subtract(1, 'years');
    this.generateCalender();
  }
  
  nextYear(): void {
    this.currentYear = moment(this.currentYear).add(1, 'years');
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
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 70)
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
