import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { HomeAdminComponent } from "./home-admin/home-admin.component";
import { AdminService } from "./admin.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    LoginAdminComponent,
    HomeAdminComponent,
    RegisterAdminComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdminService],
})
export class AdminModule {}
