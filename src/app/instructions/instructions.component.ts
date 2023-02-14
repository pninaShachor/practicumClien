import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit,OnDestroy {
  sub: Subscription;
  userName="ישראל ישראלי"
  constructor(public userService:UserService) { 
    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // logOut() {
  //   this.userService.currentUser.next(null);
  //   this.userService.removeFromStorage();
  // }
  ngOnInit(): void {
    this.sub = this.userService.thisUser.subscribe(succ => {console.log(succ); this.userName = succ.FName ? succ.FName : "ישראל ישראלי" })
    this.userName=this.userService.getFromStorage().FName
  }

}
