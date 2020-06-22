import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Router } from "@angular/router";

import * as io from "socket.io-client";

import { Order } from "../../models/order";
import { OrdersService } from "../orders.service";
import { User } from "src/app/models/user";
import { DeliversService } from "../delivers.service";

@Component({
  selector: "app-assign",
  templateUrl: "./assign.component.html",
  styleUrls: ["./assign.component.scss"],
})
export class AssignComponent implements OnInit {
  username: String = "";
  isLoadingResults = true;

  socketOrders = io("http://localhost:4001");
  dataOrders: Order[] = [];
  selectedOrderId: string;

  socketDelivers = io("http://localhost:4002");
  dataDelivers: User[] = [];
  selectedDeliverUsername: string;

  constructor(
    private admin: AdminService,
    private router: Router,
    private ordersService: OrdersService,
    private deliversService: DeliversService
  ) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);
        // Get data for dataOrders on Init
        this.getOrdersWithoutDeliver();

        this.socketOrders.on(
          "update-data",
          function (data: any) {
            this.getOrdersWithoutDeliver();
          }.bind(this)
        );

        // Get data for dataDelivers on Init
        this.getDelivers();

        this.socketDelivers.on(
          "update-data",
          function (data: any) {
            this.getDelivers();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/admin/login"])
    );
  }

  getOrdersWithoutDeliver() {
    this.ordersService.getOrders().subscribe(
      (res: any) => {
        for (let i of res) {
          if (!i.deliver) {
            this.dataOrders.push(i);
          }
        }
        console.log(this.dataOrders);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
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

  addDeliverToOrder() {
    this.isLoadingResults = true;
    this.ordersService
      .addDeliverToOrder(this.selectedOrderId, this.selectedDeliverUsername)
      .subscribe(
        (res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.socketOrders.emit("updatedata", res);
          this.router.navigate(["/admin/order-details/", id]);
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
    this.admin.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/admin/login"]);
      },
      (error) => console.error(error)
    );
  }
}
