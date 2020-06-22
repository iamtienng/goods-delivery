import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as io from "socket.io-client";

import { Order } from "src/app/models/order";

import { AdminService } from "../admin.service";
import { OrdersService } from "../orders.service";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  username: String = "";

  isLoadingResults = true;
  socket = io("http://localhost:4001");

  order: Order = {
    _id: null,
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
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);

        // Get data of deliver on Init
        this.getOrderDetails(this.route.snapshot.params.id);

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getOrderDetails();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/admin/login"])
    );
  }

  getOrderDetails(id: string) {
    this.ordersService.getOrderById(id).subscribe((data: any) => {
      this.order = data;
      console.log(this.order);
      this.isLoadingResults = false;
    });
  }

  deleteOrder(id: any) {
    this.isLoadingResults = true;
    this.ordersService.deleteOrder(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.router.navigate(["/admin"]);
        this.socket.emit("updatedata", res);
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
