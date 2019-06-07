import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatSelectModule, MatGridListModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from "@angular/material";
import { ReactiveFormsModule } from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter'; 

const MaterialComponents = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatGridListModule

];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule { }
