import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

//test with sales
import * as io from "socket.io-client";
import { ApiService } from "../../Sale/api.service";
import { Sales } from "../../Sale/sales";
//test

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  //Test with Sales
  socket = io("http://localhost:4000");

  displayedColumns: string[] = ["itemId", "itemName", "totalPrice"];
  data: Sales[] = [];
  isLoadingResults = true;
  //Test
  username: String = "";
  constructor(
    private _user: UserService,
    private _router: Router,
    //Test with sales
    private api: ApiService //test
  ) {
    this._user.user().subscribe(
      (data) => this.addName(data),
      (error) => this._router.navigate(["/client/login"])
    );
  }
  addName(data) {
    this.username = data.username;
  }

  ngOnInit(): void {
    //Test with sales
    this.getSales();

    this.socket.on(
      "update-data",
      function (data: any) {
        this.getSales();
      }.bind(this)
    );
    //test
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

  // Test with sales
  getSales() {
    this.api.getSales().subscribe(
      (res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  //test
}
