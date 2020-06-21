import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ProfileComponent } from "./profile/profile.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "/client/jobs",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "jobs",
        component: JobsComponent,
      },
      {
        path: "job-details/:id",
        component: JobDetailComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
  },
];

export const ClientRoutingModule = RouterModule.forChild(routes);
