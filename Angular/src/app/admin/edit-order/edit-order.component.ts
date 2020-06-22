import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";

import * as io from "socket.io-client";

import { Order } from "src/app/models/order";

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
  selector: "app-edit-order",
  templateUrl: "./edit-order.component.html",
  styleUrls: ["./edit-order.component.scss"],
})
export class EditOrderComponent implements OnInit {
  username: String = "";

  isLoadingResults = false;
  socket = io("http://localhost:4001");

  matcher = new MyErrorStateMatcher();

  orderForm: FormGroup;
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
    this.getOrderByIdAndParseToForm(this.route.snapshot.params.id);
    this.orderForm = this.formBuilder.group({
      orderID: [null, Validators.required],
      itemName: [null, Validators.required],
      senderName: [null, Validators.required],
      receiverName: [null, Validators.required],
      receiverAddress: [null, Validators.required],
    });
  }

  getOrderByIdAndParseToForm(id: any) {
    this.ordersService.getOrderById(id).subscribe((data: any) => {
      this.order = data;
      this.orderForm.setValue({
        orderID: this.order.orderID,
        itemName: this.order.itemName,
        senderName: this.order.senderName,
        receiverName: this.order.receiverName,
        receiverAddress: this.order.receiverAddress,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.order.orderID = this.orderForm.value.orderID;
    this.order.itemName = this.orderForm.value.itemName;
    this.order.senderName = this.orderForm.value.senderName;
    this.order.receiverName = this.orderForm.value.receiverName;
    this.order.receiverAddress = this.orderForm.value.receiverAddress;
    this.ordersService.updateOrder(this.order._id, this.order).subscribe(
      (res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.socket.emit("updatedata", res);
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
