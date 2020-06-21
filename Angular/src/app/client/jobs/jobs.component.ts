import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

import * as io from "socket.io-client";
import { Order } from "../../models/order";
import { JobsService } from "../jobs.service";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  socket = io("http://localhost:4001");
  isLoadingResults = true;

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

  username: String = "";
  constructor(
    private _user: UserService,
    private _router: Router,
    private jobs: JobsService
  ) {
    this._user.user().subscribe(
      (data) => {
        this.addName(data);

        // render to Table Jobs List
        this.getJobs();

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getJobs();
          }.bind(this)
        );
      },
      (error) => this._router.navigate(["/client/login"])
    );
  }
  addName(data) {
    this.username = data.username;
  }

  ngOnInit(): void {}

  logout() {
    this._user.logout().subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(["/client/login"]);
      },
      (error) => console.error(error)
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
}
