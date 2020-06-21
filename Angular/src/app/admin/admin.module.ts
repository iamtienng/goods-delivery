import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { AdminService } from "./admin.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { HttpClientModule } from "@angular/common/http";
import { OrdersComponent } from "./orders/orders.component";
import { DeliversComponent } from "./delivers/delivers.component";
import { AssignComponent } from "./assign/assign.component";
import { DeliverDetailsComponent } from "./deliver-details/deliver-details.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { AddOrderComponent } from "./add-order/add-order.component";
import { EditOrderComponent } from "./edit-order/edit-order.component";

@NgModule({
  declarations: [
    LoginAdminComponent,
    RegisterAdminComponent,
    OrdersComponent,
    DeliversComponent,
    AssignComponent,
    DeliverDetailsComponent,
    OrderDetailsComponent,
    AddOrderComponent,
    EditOrderComponent,
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
