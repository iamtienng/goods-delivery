import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-delivers",
  templateUrl: "./delivers.component.html",
  styleUrls: ["./delivers.component.scss"],
})
export class DeliversComponent implements OnInit {
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
