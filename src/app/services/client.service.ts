import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Client from "src/models/Client";
@Injectable({
    providedIn: 'root'
})
export default class ClientService {
    constructor(public http: HttpClient) { }
    Add(c: Client) {
        return this.http.post<Client>(`${environment.baseUrl}/Client`, c)
    }
}