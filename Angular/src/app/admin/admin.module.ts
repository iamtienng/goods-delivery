import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AdminService } from "./admin.service";

import { AdminRoutingModule } from "./admin-routing.module";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { OrdersComponent } from "./orders/orders.component";
import { DeliversComponent } from "./delivers/delivers.component";
import { AssignComponent } from "./assign/assign.component";
import { DeliverDetailsComponent } from "./deliver-details/deliver-details.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { AddOrderComponent } from "./add-order/add-order.component";
import { EditOrderComponent } from "./edit-order/edit-order.component";

import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AppComponent } from "../app.component";

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
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  providers: [AdminService],
  bootstrap: [AppComponent],
})
export class AdminModule {}
