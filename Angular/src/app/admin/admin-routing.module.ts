import { Routes, RouterModule } from "@angular/router";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";
import { OrdersComponent } from "./orders/orders.component";
import { DeliversComponent } from "./delivers/delivers.component";
import { AssignComponent } from "./assign/assign.component";

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
        path: "delivers",
        component: DeliversComponent,
      },
      {
        path: "assign",
        component: AssignComponent,
      },
    ],
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
