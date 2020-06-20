import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-register-admin",
  templateUrl: "./register-admin.component.html",
  styleUrls: ["./register-admin.component.scss"],
})
export class RegisterAdminComponent implements OnInit {
  registerAdminForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  });
  constructor(private _router: Router, private _adminService: AdminService) {}

  ngOnInit(): void {}

  moveToLogin() {
    this._router.navigate(["/admin/login"]);
  }

  register() {
    if (
      !this.registerAdminForm.valid ||
      this.registerAdminForm.controls.password.value !=
        this.registerAdminForm.controls.cpass.value
    ) {
      console.log("Invalid Form");
      return;
    }

    this._adminService
      .register(JSON.stringify(this.registerAdminForm.value))
      .subscribe(
        (data) => {
          console.log(data);
          this._router.navigate(["/admin/login"]);
        },
        (error) => console.error(error)
      );
    // console.log(JSON.stringify(this.registerAdminForm.value));
  }
}
