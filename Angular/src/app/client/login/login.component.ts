import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private userService: UserService) {
    this.userService.user().subscribe(
      (data) => this.router.navigate(["/client/jobs"]),
      (error) => {}
    );
  }

  ngOnInit() {}

  moveToRegister() {
    this.router.navigate(["/client/register"]);
  }

  login() {
    if (!this.loginForm.valid) {
      console.log("Invalid");
      return;
    }

    // console.log(JSON.stringify(this.loginForm.value));
    this.userService.login(JSON.stringify(this.loginForm.value)).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/client/jobs"]);
      },
      (error) => console.error(error)
    );
  }
}
