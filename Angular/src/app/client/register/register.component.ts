import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UserService } from "../user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    codiceFiscale: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  });
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  moveToLogin() {
    this.router.navigate(["/client/login"]);
  }

  register() {
    if (
      !this.registerForm.valid ||
      this.registerForm.controls.password.value !=
        this.registerForm.controls.cpass.value
    ) {
      console.log("Invalid Form");
      return;
    }

    this.userService
      .register(JSON.stringify(this.registerForm.value))
      .subscribe(
        (data) => {
          // console.log(data);
          this.router.navigate(["/client/login"]);
        },
        (error) => console.error(error)
      );
  }
}
