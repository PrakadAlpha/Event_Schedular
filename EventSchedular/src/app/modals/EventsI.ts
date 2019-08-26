import { Time } from '@angular/common';

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
