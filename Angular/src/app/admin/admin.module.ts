import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { HomeAdminComponent } from "./home-admin/home-admin.component";
import { AdminService } from "./admin.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { HttpClientModule } from "@angular/common/http";
import { OrdersComponent } from './orders/orders.component';
import { DeliversComponent } from './delivers/delivers.component';
import { AssignComponent } from './assign/assign.component';

@NgModule({
  declarations: [
    LoginAdminComponent,
    HomeAdminComponent,
    RegisterAdminComponent,
    OrdersComponent,
    DeliversComponent,
    AssignComponent,
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
