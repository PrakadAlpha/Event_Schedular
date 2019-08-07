import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagenotfoundComponent } from "./components/pagenotfound/pagenotfound.component";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./components/index/index.component";
import { EventsComponent } from "./components/events/events.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AuthGaurdService } from "./services/auth-gaurd.service";
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "index", component: IndexComponent, canActivate: [AuthGaurdService] },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [AuthGaurdService]
  },
  { path: "login", component: LoginComponent },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: "home",
    component: HomepageComponent,
    canActivate: [AuthGaurdService]
  },
  { path: "**", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
