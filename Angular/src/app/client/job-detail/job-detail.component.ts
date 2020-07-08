import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import * as io from "socket.io-client";

import { Order } from "src/app/models/order";

import { JobsService } from "../jobs.service";
import { UserService } from "../user.service";

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
  selector: "app-job-detail",
  templateUrl: "./job-detail.component.html",
  styleUrls: ["./job-detail.component.scss"],
})
export class JobDetailComponent implements OnInit {
  username: String = "";

  isLoadingResults = true;
  socket = io("http://localhost:4001");

  job: Order = {
    _id: "",
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
        "https://raw.githubusercontent.com/iamtienng/Public-Images/master/room-black-18dp.svg",
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
    private route: ActivatedRoute,
    private api: JobsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user().subscribe(
      (data) => {
        this.addName(data);

        this.getJobDetails(this.route.snapshot.params.id);

        this.socket.on(
          "update-data",
          function (data: any) {
            this.getJobDetails();
          }.bind(this)
        );
      },
      (error) => this.router.navigate(["/client/login"])
    );
  }

  getJobDetails(id: string) {
    this.api.getJobById(id).subscribe((data: any) => {
      this.job = data;
      // console.log(this.job);
      // console.log(this.job.geometryCoordinate);
      // console.log(this.coordinate);

      // Set Point and init map

      this.setPoint(this.job.geometryCoordinate);
      this.addressPoint.setStyle(this.styleAddressPoint);
      this.initilizeMap(this.job.geometryCoordinate);
      // End init map

      this.isLoadingResults = false;
    });
  }

  // Openlayers init map
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
    this.userService.logout().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/client/login"]);
      },
      (error) => console.error(error)
    );
  }
}
