import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpClient: HttpClient) {
    if (httpClient == null) {
      throw Error('httpClient is null or undefined');
    }
  }

  // tslint:disable-next-line: typedef
  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) { return of(this.members); }
    return this.httpClient.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members: Member[]) => {
        this.members = members;
        return members;
      })
    );
  }

  // tslint:disable-next-line: typedef
  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) { return of(member); }

    return this.httpClient.get<Member>(this.baseUrl + 'users/' + username);
  }

  // tslint:disable-next-line: typedef
  updateMember(member: Member) {
    return this.httpClient.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
