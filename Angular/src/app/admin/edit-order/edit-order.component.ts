import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AdminService } from "../admin.service";

@Component({
  selector: "app-edit-order",
  templateUrl: "./edit-order.component.html",
  styleUrls: ["./edit-order.component.scss"],
})
export class EditOrderComponent implements OnInit {
  username: String = "";
  constructor(private admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.admin.admin().subscribe(
      (data) => {
        this.addName(data);
      },
      (error) => this.router.navigate(["/admin/login"])
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
