import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  username: String = "";
  constructor(private _user: UserService, private _router: Router) {
    this._user.user().subscribe(
      (data) => this.addName(data),
      (error) => this._router.navigate(["/client/login"])
    );
  }
  addName(data) {
    this.username = data.username;
  }

  ngOnInit(): void {}

  logout() {
    this._user.logout().subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(["/client/login"]);
      },
      (error) => console.error(error)
    );
  }
}
