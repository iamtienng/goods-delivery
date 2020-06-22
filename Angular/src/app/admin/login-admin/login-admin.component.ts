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
  loginStatus = true;

  loginAdminForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit() {}

  moveToRegister() {
    this.router.navigate(["/admin/register"]);
  }

  login() {
    if (!this.loginAdminForm.valid) {
      console.log("Invalid");
      return;
    }

    this.adminService
      .login(JSON.stringify(this.loginAdminForm.value))
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/admin/orders"]);
        },
        (error) => {
          this.loginStatus = false;
          console.error(error);
        }
      );
  }
}
