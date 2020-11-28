import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService,
              private toastr: ToastrService) {
    if (accountService == null) {
      throw Error('accountService is null or undefined');
    }
    if (toastr == null) {
      throw Error('toastr is null or undefined');
    }
  }

  canActivate(): Observable<boolean | any> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        // tslint:disable-next-line: curly
        if (user) return of(false);
        this.toastr.error('You shall not pass!');
      })
    );
  }
}
