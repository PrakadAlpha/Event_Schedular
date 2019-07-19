import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
    // let p = document.createElement('p');
    // p.innerHTML = this.currentDate.toJSON();
    // document.querySelector('.calender').appendChild(p);
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
  }
