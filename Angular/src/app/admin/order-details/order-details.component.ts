import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

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
    geometryCoordinate: null,
  };

  // Openlayers map
  map;
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
  raster = new TileLayer({
    source: new OSM(),
  });
  source = new VectorSource({ wrapX: false, features: [this.addressPoint] });
  vector = new VectorLayer({
    source: this.source,
  });
  // End Openlayers needed variable

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
      // console.log(this.order);

      // Set Point and init map

      this.setPoint(this.order.geometryCoordinate);
      this.addressPoint.setStyle(this.styleAddressPoint);
      this.initilizeMap(this.order.geometryCoordinate);
      // End init map

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
