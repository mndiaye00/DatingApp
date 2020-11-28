import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {
    if (accountService == null) {
      throw Error('accountService is null or undefined');
    }
    if (router == null) {
      throw Error('router is null or undefined');
    }
    if (toastr == null) {
      throw Error('toastr is null or undefined');
    }
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onLoginClick() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/members');
    });
  }

  // tslint:disable-next-line: typedef
  onLogoutClick() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
