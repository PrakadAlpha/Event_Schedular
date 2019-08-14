import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { IndexComponent } from './components/index/index.component';
import { EventsComponent } from './components/events/events.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component'; 
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './material/material.module';
import { EventFormComponent } from './components/events/event-form/event-form.component';
import { DatePipe } from '@angular/common';
import { CalenderComponent } from './components/index/calender/calender.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material';
import { DateDetailComponent } from './components/index/calender/date-detail/date-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    IndexComponent,
    EventsComponent,
    LoginComponent,
    LogoutComponent,
    EventFormComponent,
    CalenderComponent,
    HomepageComponent,
    DateDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [EventFormComponent, DateDetailComponent]
})
export class AppModule { }
