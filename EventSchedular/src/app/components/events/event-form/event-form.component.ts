import { Component, OnInit } from "@angular/core";
import { Events } from "src/app/modals/Events";
import { EventsService } from "src/app/services/events.service";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { EventsComponent } from "../events.component";

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.sass"]
})
export class EventFormComponent implements OnInit {
  event: Events = new Events();

  submitted = false;

  minDate = new Date();

  appName = ["PGP", "WEBCASH", "BRIDGER", "EM", "SWIFT", "TRAX"];
  environment = ["Prod", "Dev", "Qa"];
  eventName = ["Stable Operations", "Development Projects", "Project Pipeline"];
  eventType = [
    "Deploy QA",
    "Patching Prod",
    "Patching QA/Dev",
    "Freeze",
    "Deploy Prod",
    "Business Go Live"
  ];
  level = ["L2", "L3"];

  constructor(
    public service: EventsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EventsComponent>
  ) {}

  ngOnInit() {}

  //Subscribe and send data to service
  save() {
    console.log("in Save");

    this.service.addEvent(this.service.form.value).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
    this.event = new Events();
  }

  update() {
    this.service.updateEvent(this.service.form.value).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }

  //Call save method after submit
  onSubmit() {
    if (!this.service.form.get("id").value) {
      this.save();
    } else this.update();
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.onClose();
    // setTimeout(() =>{
    //   location.reload();
    // }, 100)
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.service.form.reset();
  }
}
