import { Injectable } from "@angular/core";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Order } from "../models/order";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const apiUrl = "http://localhost:3000/orders";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getJobsListByDeliver(deliver: String): Observable<Order[]> {
    const url = `${apiUrl}/getjobslist/${deliver}`;
    return this.http.get<Order[]>(url).pipe(
      tap(() => console.log(`fetched jobs list deliver=${deliver}`)),
      catchError(this.handleError("getJobsListByDeliver", []))
    );
  }

  getJobById(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap((_) => console.log(`fetched job id=${id}`)),
      catchError(this.handleError<Order>())
    );
  }

  updateJob(id: string, job: Order): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, job, httpOptions).pipe(
      tap((_) => console.log(`Finished job id = ${id}`)),
      catchError(this.handleError<any>())
    );
  }
}
