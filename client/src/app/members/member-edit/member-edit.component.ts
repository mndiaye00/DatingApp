import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User;
  // tslint:disable-next-line: typedef
  @HostListener('window:beforeunloaded', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService,
              private memberService: MembersService,
              private toastrService: ToastrService) {
    if (accountService == null) {
      throw Error('accountService is null or undefined');
    }
    if (memberService == null) {
      throw Error('memberService is null or undefined');
    }
    if (toastrService == null) {
      throw Error('toastrService is null or undefined');
    }
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember();
  }
  // tslint:disable-next-line: typedef
  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  // tslint:disable-next-line: typedef
  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastrService.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });
  }
}
