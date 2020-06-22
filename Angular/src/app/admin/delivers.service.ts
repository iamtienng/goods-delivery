import { Injectable } from "@angular/core";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { User } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const apiUrl = "http://localhost:3000/users/delivers";

@Injectable({
  providedIn: "root",
})
export class DeliversService {
  constructor(private http: HttpClient) {}

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getDelivers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiUrl}`).pipe(
      tap(() => console.log("Fetched Delivers")),
      catchError(this.handleError([]))
    );
  }

  getDeliverById(id: string): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((_) => console.log(`Fetched deliver id=${id}`)),
      catchError(this.handleError<User>())
    );
  }

  deleteDeliver(id: string): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap((_) => console.log(`Deleted deliver id=${id}`)),
      catchError(this.handleError<User>())
    );
  }
}
