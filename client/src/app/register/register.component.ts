import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @Output()
  cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onRegisterClick() {
    this.accountService.userRegister(this.model).subscribe(response => {
      console.log(response);
      this.onCancelClick();
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onCancelClick() {
    this.cancelRegister.emit(false);
  }
}
