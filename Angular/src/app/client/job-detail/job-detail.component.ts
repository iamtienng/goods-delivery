import { Component, OnInit } from "@angular/core";

import * as io from "socket.io-client";
import { ActivatedRoute, Router } from "@angular/router";

import { Order } from "src/app/models/order";
import { JobsService } from "../jobs.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-job-detail",
  templateUrl: "./job-detail.component.html",
  styleUrls: ["./job-detail.component.scss"],
})
export class JobDetailComponent implements OnInit {
  socket = io("http://localhost:4001");
  isLoadingResults = true;

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
    private _user: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getJobDetails(this.route.snapshot.params.id);

    this.socket.on(
      "update-data",
      function (data: any) {
        this.getJobDetails();
      }.bind(this)
    );
  }

  getJobDetails(id: string) {
    this.api.getJobById(id).subscribe((data: any) => {
      this.job = data;
      console.log(this.job);
      this.isLoadingResults = false;
    });
  }
  logout() {
    this._user.logout().subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(["/client/login"]);
      },
      (error) => console.error(error)
    );
  }
}
