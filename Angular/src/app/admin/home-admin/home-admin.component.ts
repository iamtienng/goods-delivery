import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-admin",
  templateUrl: "./home-admin.component.html",
  styleUrls: ["./home-admin.component.scss"],
})
export class HomeAdminComponent implements OnInit {
  username: String = "";
  constructor(private _admin: AdminService, private _router: Router) {
    this._admin.admin().subscribe(
      (data) => this.addName(data),
      (error) => this._router.navigate(["/admin/login"])
    );
  }

  addName(data) {
    this.username = data.username;
  }

  ngOnInit(): void {}
  logout() {
    this._admin.logout().subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(["/admin/login"]);
      },
      (error) => console.error(error)
    );
  }
}
