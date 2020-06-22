import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";

import * as io from "socket.io-client";

import { Order } from "src/app/models/order";

import { JobsService } from "../jobs.service";
import { UserService } from "../user.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-job-finish",
  templateUrl: "./job-finish.component.html",
  styleUrls: ["./job-finish.component.scss"],
})
export class JobFinishComponent implements OnInit {
  username: String = "";

  isLoadingResults = false;
  socket = io("http://localhost:4000");

  jobForm: FormGroup;

  job: Order;

  matcher = new MyErrorStateMatcher();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.user().subscribe(
      (data) => {
        this.addName(data);

        this.getJobById(this.route.snapshot.params.id);
        this.jobForm = this.formBuilder.group({
          note: [null, Validators.required],
        });
      },
      (error) => this.router.navigate(["/client/login"])
    );
  }

  getJobById(id: any) {
    this.jobsService.getJobById(id).subscribe((data: any) => {
      this.job = data;
      this.jobForm.setValue({
        note: data.note,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.job.status = true;
    this.job.note = this.jobForm.value.note;
    console.log(JSON.stringify(this.jobForm.value));
    this.jobsService.updateJob(this.job._id, this.job).subscribe(
      (res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.socket.emit("Finished", res);
        this.router.navigate(["/client/job-details", id]);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  addName(data) {
    this.username = data.username;
  }

  logout() {
    this.userService.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/client/login"]);
      },
      (error) => console.error(error)
    );
  }
}
