import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members$!: Observable<Member[]>;

  constructor(private memberService: MembersService) {
    if (memberService == null) {
      throw Error('memberService is null or undefined');
    }
  }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }

}
