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

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    IndexComponent,
    EventsComponent,
    LoginComponent,
    LogoutComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EventFormComponent]
})
export class AppModule { }
