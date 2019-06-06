import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatSelectModule, MatGridListModule, MatDatepickerModule, MatFormFieldModule } from "@angular/material";
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
  MatGridListModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatFormFieldModule
];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule { }
