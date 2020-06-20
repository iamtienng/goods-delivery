import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from "./Sale/sales/sales.component";
import { SalesDetailsComponent } from "./Sale/sales-details/sales-details.component";
import { AddSalesComponent } from "./Sale/add-sales/add-sales.component";
import { EditSalesComponent } from "./Sale/edit-sales/edit-sales.component";

const routes: Routes = [
  { path: "", redirectTo: "/client/jobs", pathMatch: "full" },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "client",
    loadChildren: () =>
      import("./client/client.module").then((m) => m.ClientModule),
  },

  {
    path: "sales",
    component: SalesComponent,
    data: { title: "List of Sales" },
  },
  {
    path: "sales-details/:id",
    component: SalesDetailsComponent,
    data: { title: "Sales Details" },
  },
  {
    path: "add-sales",
    component: AddSalesComponent,
    data: { title: "Add Sales" },
  },
  {
    path: "edit-sales/:id",
    component: EditSalesComponent,
    data: { title: "Edit Sales" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
