import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  username: String = "";
  deliver: User;
  constructor(private _user: UserService, private _router: Router) {
    this._user.user().subscribe(
      (data: any) => {
        this.addName(data);
        this.deliver = data;
        // console.log(JSON.stringify(data) + "1");
        // console.log(JSON.stringify(this.deliver) + "2");
      },
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
