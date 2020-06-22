import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "src/app/models/user";

import { UserService } from "../user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  username: String = "";

  deliver: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.user().subscribe(
      (data: any) => {
        this.addName(data);
        this.deliver = data;
      },
      (error) => this.router.navigate(["/client/login"])
    );
  }

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
