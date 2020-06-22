import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Router } from "@angular/router";

import * as io from "socket.io-client";
import { Order } from "../../models/order";
import { OrdersService } from "../orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  username: String = "";

  socket = io("http://localhost:4001");
  isLoadingResults = true;
  displayedOrdersColumns: string[] = [
    "orderID",
    "itemName",
    "senderName",
    "receiverName",
    "receiverAddress",
    "deliver",
    "status",
    "note",
  ];
  dataOrders: Order[] = [];

  constructor(
    private admin: AdminService,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);
      },
      (error) => this.router.navigate(["/admin/login"])
    );
    // render to Table Jobs List
    this.getOrders();

    this.socket.on(
      "update-data",
      function (data: any) {
        this.getOrders();
      }.bind(this)
    );
  }
  getOrders() {
    this.ordersService.getOrders().subscribe(
      (res: any) => {
        this.dataOrders = res;
        console.log(this.dataOrders);
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
    this.admin.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/admin/login"]);
      },
      (error) => console.error(error)
    );
  }
}
