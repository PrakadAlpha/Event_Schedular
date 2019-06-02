import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule } from "@angular/material";

const MaterialComponents = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule
];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule { }
