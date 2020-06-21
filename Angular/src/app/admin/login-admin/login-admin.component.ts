import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-login-admin",
  templateUrl: "./login-admin.component.html",
  styleUrls: ["./login-admin.component.scss"],
})
export class LoginAdminComponent implements OnInit {
  loginAdminForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _router: Router, private _admin: AdminService) {}

  ngOnInit() {}

  moveToRegister() {
    this._router.navigate(["/admin/register"]);
  }

  login() {
    if (!this.loginAdminForm.valid) {
      console.log("Invalid");
      return;
    }

    // console.log(JSON.stringify(this.loginForm.value));
    this._admin.login(JSON.stringify(this.loginAdminForm.value)).subscribe(
      (data) => {
        console.log(data);
        this._router.navigate(["/admin/orders"]);
      },
      (error) => console.error(error)
    );
  }
}
