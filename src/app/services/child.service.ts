import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Child from "src/models/Child";
@Injectable({
    providedIn: 'root'
})
export default class ChildService {
    constructor(public http: HttpClient) { }
    Add(c: Child) {
        return this.http.post<Child>(`${environment.baseUrl}/Child`, c)
    }
}