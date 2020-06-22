import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as io from "socket.io-client";

import { User } from "src/app/models/user";
import { Order } from "src/app/models/order";

import { AdminService } from "../admin.service";
import { DeliversService } from "../delivers.service";
import { OrdersService } from "../orders.service";

@Component({
  selector: "app-deliver-details",
  templateUrl: "./deliver-details.component.html",
  styleUrls: ["./deliver-details.component.scss"],
})
export class DeliverDetailsComponent implements OnInit {
  username: String = "";

  isLoadingResults = true;

  socketOrders = io("http://localhost:4001");
  socketDelivers = io("http://localhost:4002");

  deliver: User = {
    _id: null,
    name: "",
    surname: "",
    codiceFiscale: "",
    username: "",
    email: "",
    password: "",
    creation_dt: null,
  };

  displayedOrdersColumns: string[] = [
    "orderID",
    "itemName",
    "senderName",
    "receiverName",
    "receiverAddress",
    "status",
    "note",
  ];
  dataOrders: Order[] = [];

  constructor(
    private admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private deliversService: DeliversService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);

        // Get data for dataOrders on Init
        this.getOrdersByDeliver();

        this.socketOrders.on(
          "update-data",
          function (data: any) {
            this.getOrdersByDeliver();
          }.bind(this)
        );

        // Get data of deliver on Init
        this.getDeliverDetails(this.route.snapshot.params.id);

        this.socketDelivers.on(
          "update-data",
          function (data: any) {
            this.getDeliverDetails();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/admin/login"])
    );
  }

  getDeliverDetails(id: string) {
    this.deliversService.getDeliverById(id).subscribe((data: any) => {
      this.deliver = data;
      console.log(this.deliver);
      this.isLoadingResults = false;
    });
  }

  deleteDeliver(id: any) {
    this.isLoadingResults = true;
    this.deliversService.deleteDeliver(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.router.navigate(["/admin/delivers"]);
        this.socketDelivers.emit("updatedata", res);
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  getOrdersByDeliver() {
    this.ordersService.getOrdersByDeliver(this.deliver.username).subscribe(
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
