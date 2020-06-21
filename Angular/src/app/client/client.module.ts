import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "../app.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ProfileComponent } from "./profile/profile.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";

import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { JobFinishComponent } from './job-finish/job-finish.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    JobsComponent,
    ProfileComponent,
    JobDetailComponent,
    JobFinishComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
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
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class ClientModule {}
