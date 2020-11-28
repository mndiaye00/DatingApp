import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountService: AccountService,
              private toastr: ToastrService) {
    if (accountService == null) {
      throw Error('accountService is null or undefined');
    }
    if (toastr == null) {
      throw Error('toastr is null or undefined');
    }
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onRegisterClick() {
    this.accountService.userRegister(this.model).subscribe(response => {
      console.log(response);
      this.onCancelClick();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  // tslint:disable-next-line: typedef
  onCancelClick() {
    this.cancelRegister.emit(false);
  }
}
