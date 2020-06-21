import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

import { Order } from "../models/order";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const apiUrl = "http://localhost:3000/orders";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${apiUrl}`).pipe(
      tap(() => console.log("fetched orders")),
      catchError(this.handleError("getJobs", []))
    );
  }

  getOrderById(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap((_) => console.log(`Fetched order id=${id}`)),
      catchError(this.handleError<Order>())
    );
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(apiUrl, order, httpOptions).pipe(
      tap((s: Order) => console.log(`Added order w/ id=${s._id}`)),
      catchError(this.handleError<Order>())
    );
  }

  updateOrder(id: string, order: Order): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, order, httpOptions).pipe(
      tap((_) => console.log(`Updated order id = ${id}`)),
      catchError(this.handleError<any>())
    );
  }

  deleteOrder(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Order>(url, httpOptions).pipe(
      tap((_) => console.log(`Deleted order id=${id}`)),
      catchError(this.handleError<Order>())
    );
  }
}
