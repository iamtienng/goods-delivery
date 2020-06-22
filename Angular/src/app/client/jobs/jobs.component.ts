import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import * as io from "socket.io-client";

import { Order } from "../../models/order";

import { JobsService } from "../jobs.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  username: String = "";

  isLoadingResults = true;
  socket = io("http://localhost:4001");

  displayedJobsColumns: string[] = [
    "orderID",
    "itemName",
    "senderName",
    "receiverName",
    "receiverAddress",
    "status",
    "note",
  ];
  dataJobs: Order[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private jobs: JobsService
  ) {}

  ngOnInit(): void {
    this.userService.user().subscribe(
      (data) => {
        this.addName(data);

        // Get data for jobs list
        this.getJobs();

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getJobs();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/client/login"])
    );
  }

  getJobs() {
    this.jobs.getJobsListByDeliver(this.username).subscribe(
      (res: any) => {
        this.dataJobs = res;
        console.log(this.dataJobs);
        this.isLoadingResults = false;
      },
      (err) => {
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
