import { Routes, RouterModule } from "@angular/router";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { OrdersComponent } from "./orders/orders.component";
import { DeliversComponent } from "./delivers/delivers.component";
import { AssignComponent } from "./assign/assign.component";
import { AddOrderComponent } from "./add-order/add-order.component";
import { DeliverDetailsComponent } from "./deliver-details/deliver-details.component";
import { EditOrderComponent } from "./edit-order/edit-order.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "/admin/orders",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginAdminComponent,
      },
      {
        path: "register",
        component: RegisterAdminComponent,
      },
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: "add-order",
        component: AddOrderComponent,
      },

      {
        path: "edit-order/:id",
        component: EditOrderComponent,
      },
      {
        path: "order-details/:id",
        component: OrderDetailsComponent,
      },
      {
        path: "delivers",
        component: DeliversComponent,
      },
      {
        path: "deliver-details/:id",
        component: DeliverDetailsComponent,
      },
      {
        path: "assign",
        component: AssignComponent,
      },
    ],
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
