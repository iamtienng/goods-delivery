import { Routes, RouterModule } from "@angular/router";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { HomeAdminComponent } from "./home-admin/home-admin.component";
import { RegisterAdminComponent } from "./register-admin/register-admin.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "/admin/home",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginAdminComponent,
      },
      {
        path: "home",
        component: HomeAdminComponent,
      },
      {
        path: "register",
        component: RegisterAdminComponent,
      },
    ],
  },
];

export const AdminRoutingModule = RouterModule.forChild(routes);
