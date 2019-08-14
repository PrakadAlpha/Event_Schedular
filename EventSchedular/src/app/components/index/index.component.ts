import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import * as moment from "moment";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragEnter,
  CdkDragExit
} from "@angular/cdk/drag-drop";
import { CalenderComponent } from "./calender/calender.component";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.sass"]
})
export class IndexComponent implements OnInit {
  @ViewChild(CalenderComponent, {static: false})
  calenderComp: CalenderComponent;

  dragApp = ["PGP", "WEBCASH", "BRIDGER", "EM", "SWIFT", "TRAX"];

  dropApp = [];

  constructor(private loginService: AuthenticationService) {}

  ngOnInit() {
    // let p = document.createElement('p');
    // p.innerHTML = this.currentDate.toJSON();
    // document.querySelector('.calender').appendChild(p);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer != event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.calenderComp.generateCalender();
    } else {
      moveItemInArray(this.dragApp, event.previousIndex, event.currentIndex);
      this.calenderComp.generateCalender();
    }
  }
}
