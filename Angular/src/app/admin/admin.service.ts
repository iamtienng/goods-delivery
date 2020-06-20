import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AdminService {
  constructor(private _http: HttpClient) {}

  register(body: any) {
    return this._http.post("http://127.0.0.1:3000/admin/register", body, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  login(body: any) {
    return this._http.post("http://127.0.0.1:3000/admin/login", body, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  admin() {
    return this._http.get("http://127.0.0.1:3000/admin/admin", {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }

  logout() {
    return this._http.get("http://127.0.0.1:3000/admin/logout", {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    });
  }
}
