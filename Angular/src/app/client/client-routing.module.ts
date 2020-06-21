import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ProfileComponent } from "./profile/profile.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";
import { JobFinishComponent } from "./job-finish/job-finish.component";

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
        path: "job-finish/:id",
        component: JobFinishComponent,
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
