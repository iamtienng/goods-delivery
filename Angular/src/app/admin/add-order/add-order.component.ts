import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

import * as io from "socket.io-client";

import { Order } from "../../models/order";

import { AdminService } from "../admin.service";
import { OrdersService } from "../orders.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {
  username: String = "";

  isLoadingResults = false;
  socket = io("http://localhost:4001");

  matcher = new MyErrorStateMatcher();

  newOrder: Order = {
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

  orderForm: FormGroup;
  orderID: "";
  itemName: "";
  senderName: "";
  receiverName: "";
  receiverAddress: "";

  constructor(
    private admin: AdminService,
    private router: Router,
    private ordersService: OrdersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);
      },
      (error) => this.router.navigate(["/admin/login"])
    );
    this.orderForm = this.formBuilder.group({
      orderID: [null, Validators.required],
      itemName: [null, Validators.required],
      senderName: [null, Validators.required],
      receiverName: [null, Validators.required],
      receiverAddress: [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;

    this.newOrder.orderID = this.orderForm.value.orderID;
    this.newOrder.itemName = this.orderForm.value.itemName;
    this.newOrder.senderName = this.orderForm.value.senderName;
    this.newOrder.receiverName = this.orderForm.value.receiverName;
    this.newOrder.receiverAddress = this.orderForm.value.receiverAddress;

    this.ordersService.addOrder(this.newOrder).subscribe(
      (res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.socket.emit("updatedata", res);
        this.router.navigate(["/admin/orders"]);
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
