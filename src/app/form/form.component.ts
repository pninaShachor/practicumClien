import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Child from 'src/models/Child';
import Client from 'src/models/Client';
import ClientService from '../services/client.service';
import { UserService } from '../services/user.service';
import swal from 'sweetalert';
import ExcelService from '../services/excel.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  client: Client = new Client(0, "", "", "", null, null, null, null);
  id: number;
  children: Child[] = [];
  child: Child = new Child(0, "", "", null);
  isChild: boolean = false;
  data = []
  constructor(private router: Router, public userService: UserService, public clientService: ClientService,
     private excelServ: ExcelService) {
  }
  ngOnInit(): void {
    this.client = this.userService.getFromStorage();
  }
  ngOnDestroy() {
    this.userService.setInStorage(this.client);
  }
  save(form) {
    if (this.child.FName == '' && this.child.Id == 0 && this.child.BornDate == null && this.child.IdentityN == '') {
      this.children = [];
    }
    else {
      this.children.push(this.child);
    }
    this.data.push(this.client)
    this.client.Children = this.children
    this.children.forEach(element => {
      this.data.push(element)
    });
    this.excelServ.exportexcel(this.data, (this.client.FName) + '-excel')
    this.clientService.Add(this.client).subscribe(succ => {
      swal("מצוין!", "המידע נשמר בהצלחה!", "success");
    })
    form.reset();
    this.isChild = false;
    this.userService.removeFromStorage();
    this.data = []
  }
  addChild() {
    this.children.push(this.child);
    this.child = new Child(0, " ", " ", null);
  }
  openChild() {
    this.isChild = true;
  }
  isValidIsraeliID(idInt) {
    let id = String(idInt).trim();
    if (id.length > 9 || id.length < 5 || isNaN(idInt)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array
      .from(id, Number)
      .reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
  }
  isValidDate() {
    let dt = new Date(this.client.BornDate)
    return dt.getFullYear() < new Date().getFullYear() && dt.getFullYear() + 121 > new Date().getFullYear()
  }
}
