import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Router } from "@angular/router";

import * as io from "socket.io-client";

import { User } from "../../models/user";
import { DeliversService } from "../delivers.service";

@Component({
  selector: "app-delivers",
  templateUrl: "./delivers.component.html",
  styleUrls: ["./delivers.component.scss"],
})
export class DeliversComponent implements OnInit {
  username: String = "";
  socket = io("http://localhost:4002");
  isLoadingResults = true;

  displayedDeliversColumns: string[] = [
    "name",
    "surname",
    "codiceFiscale",
    "username",
    "email",
  ];
  dataDelivers: User[] = [];

  constructor(
    private admin: AdminService,
    private router: Router,
    private deliversService: DeliversService
  ) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);

        // render to Table Delivers List
        this.getDelivers();

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getDelivers();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/admin/login"])
    );
  }
  addName(data) {
    this.username = data.username;
  }

  getDelivers() {
    this.deliversService.getDelivers().subscribe(
      (res: any) => {
        this.dataDelivers = res;
        console.log(this.dataDelivers);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  logout() {
    this.admin.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/admin/login"]);
      },
      (error) => console.error(error)
    );
  }
}
