import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

import { Sales } from "./sales";
import { Chart } from "./chart";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const apiUrl = "http://localhost:3000/api";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${apiUrl}`).pipe(
      tap(() => console.log("fetched sales")),
      catchError(this.handleError([]))
    );
  }

  getSalesById(id: string): Observable<Sales> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Sales>(url).pipe(
      tap((_) => console.log(`fetched sales id=${id}`)),
      catchError(this.handleError<Sales>())
    );
  }

  addSales(sales: Sales): Observable<Sales> {
    return this.http.post<Sales>(apiUrl, sales, httpOptions).pipe(
      tap((s: Sales) => console.log(`added sales w/ id=${s._id}`)),
      catchError(this.handleError<Sales>())
    );
  }

  updateSales(id: string, sales: Sales): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, sales, httpOptions).pipe(
      tap((_) => console.log(`updated sales id=${id}`)),
      catchError(this.handleError<any>())
    );
  }

  deleteSales(id: string): Observable<Sales> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Sales>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted sales id=${id}`)),
      catchError(this.handleError<Sales>())
    );
  }

  getChart(): Observable<Chart> {
    const url = `${apiUrl}/itemsales`;
    return this.http.get<Chart>(url).pipe(
      tap((_) => console.log(`fetched chart data`)),
      catchError(this.handleError<Chart>())
    );
  }
}
