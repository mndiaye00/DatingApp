import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {
    if (httpClient == null) {
      throw Error('httpClient is null or undefined');
    }
  }

  // tslint:disable-next-line: typedef
  login(model: any) {
    return this.httpClient.post(this.baseUrl + 'account/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  userRegister(model: any) {
    return this.httpClient.post(this.baseUrl + 'account/register', model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }
}
