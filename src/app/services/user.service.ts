import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import Child from 'src/models/Child';
import Client from 'src/models/Client';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  thisUser = new BehaviorSubject<{id:number, FName:string, LName:string, IdentityN:string, 
   BornDate:Date, MorF:string,HMO:string,Children:Child[]
  }>(new Client(0," "," "," ",null,null,null,null));
  constructor() { }
  setInStorage(user) {
    localStorage.setItem("thisUser", JSON.stringify(user));
  }
  getFromStorage() {
    let u = localStorage.getItem("thisUser");
    if (!u)
      return new Client(0," "," "," ",null,null,null,null);
    return JSON.parse(u);
  }
  removeFromStorage() {
    localStorage.removeItem("thisUser");
  }
}
