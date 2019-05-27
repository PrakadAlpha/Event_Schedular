import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [

  {path:"", component: IndexComponent },
  {path:"**", component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
