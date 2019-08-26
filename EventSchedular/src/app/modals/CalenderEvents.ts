import * as moment from "moment";

export interface CalendarEvent {
    mDate?: moment.Moment;
    selected?: boolean;
    today?: boolean;
  }
