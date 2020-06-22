import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import * as io from "socket.io-client";

import { Order } from "src/app/models/order";

import { JobsService } from "../jobs.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-job-detail",
  templateUrl: "./job-detail.component.html",
  styleUrls: ["./job-detail.component.scss"],
})
export class JobDetailComponent implements OnInit {
  username: String = "";

  isLoadingResults = true;
  socket = io("http://localhost:4001");

  job: Order = {
    _id: "",
    orderID: "",
    itemName: "",
    senderName: "",
    receiverName: "",
    receiverAddress: "",
    deliver: "",
    status: false,
    note: "",
    updated: null,
  };

  constructor(
    private route: ActivatedRoute,
    private api: JobsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user().subscribe(
      (data) => {
        this.addName(data);

        this.getJobDetails(this.route.snapshot.params.id);

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getJobDetails();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/client/login"])
    );
  }

  getJobDetails(id: string) {
    this.api.getJobById(id).subscribe((data: any) => {
      this.job = data;
      console.log(this.job);
      this.isLoadingResults = false;
    });
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
