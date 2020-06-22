import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as io from "socket.io-client";

import { AdminService } from "../admin.service";
import { DeliversService } from "../delivers.service";
import { User } from "src/app/models/user";
import { OrdersService } from "../orders.service";
import { Order } from "src/app/models/order";

@Component({
  selector: "app-deliver-details",
  templateUrl: "./deliver-details.component.html",
  styleUrls: ["./deliver-details.component.scss"],
})
export class DeliverDetailsComponent implements OnInit {
  username: String = "";

  socketOrders = io("http://localhost:4001");
  socket = io("http://localhost:4002");
  isLoadingResults = true;

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

        // render to Table Jobs List
        this.getOrdersByDeliver();

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getOrdersByDeliver();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/admin/login"])
    );

    this.getDeliverDetails(this.route.snapshot.params.id);

    this.socket.on(
      "update-data",
      function (data: any) {
        this.getDeliverDetails();
      }.bind(this)
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
        this.socket.emit("updatedata", res);
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
