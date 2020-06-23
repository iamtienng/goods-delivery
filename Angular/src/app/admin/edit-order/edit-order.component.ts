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

// Import for Openlayers API
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Draw from "ol/interaction/Draw";

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
    geometryCoordinate: null,
  };

  // Openlayers map
  map;
  draw;
  addressPoint = new Feature({});
  styleAddressPoint = new Style({
    image: new Icon({
      color: "#8959A8",
      crossOrigin: "anonymous",
      imgSize: [20, 20],
      src:
        "https://raw.githubusercontent.com/iamtienng/Public-Icon/b228e25a865efd9c17297c1e07289de9d26b09c6/room-black-18dp.svg",
    }),
  });
  types = GeometryType.POINT;
  raster = new TileLayer({
    source: new OSM(),
  });
  source = new VectorSource({ wrapX: false, features: [this.addressPoint] });
  vector = new VectorLayer({
    source: this.source,
  });
  // End of variables needed for Openlayers

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
      // Set Point and init map

      this.setPoint(this.order.geometryCoordinate);
      this.addressPoint.setStyle(this.styleAddressPoint);
      this.initilizeMap(this.order.geometryCoordinate);
      this.addInteraction();
      this.draw.on("drawend", (evt) => {
        console.log(evt.feature.getGeometry().getCoordinates());
        this.order.geometryCoordinate = evt.feature
          .getGeometry()
          .getCoordinates();
      });
      // End init map
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.order.orderID = this.orderForm.value.orderID;
    this.order.itemName = this.orderForm.value.itemName;
    this.order.senderName = this.orderForm.value.senderName;
    this.order.receiverName = this.orderForm.value.receiverName;
    this.order.receiverAddress = this.orderForm.value.receiverAddress;
    let date: Date = new Date();
    this.order.updated = date;

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

  // Openlayers needed functions
  initilizeMap(geoData) {
    this.map = new Map({
      target: "map",
      layers: [this.raster, this.vector],
      view: new View({
        center: fromLonLat(toLonLat(geoData)),
        zoom: 15,
      }),
    });
  }

  addInteraction() {
    this.draw = new Draw({
      source: this.source,
      type: this.types,
    });
    this.map.addInteraction(this.draw);
  }

  setPoint(geoData) {
    this.addressPoint.setGeometry(new Point(fromLonLat(toLonLat(geoData))));
  }
  // End of Openlayers functions

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
