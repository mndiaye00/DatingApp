import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    if (httpClient == null) {
      throw Error('httpClient is null or undefined');
    }
  }

  // tslint:disable-next-line: typedef
  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl + 'users');
  }

  // tslint:disable-next-line: typedef
  getMember(username: string): Observable<Member> {
    return this.httpClient.get<Member>(this.baseUrl + 'users/' + username);
  }
}
