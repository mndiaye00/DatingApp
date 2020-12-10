import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];

  constructor(private memberService: MembersService) {
    if (memberService == null) {
      throw Error('memberService is null or undefined');
    }
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  // tslint:disable-next-line: typedef
  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }
}
