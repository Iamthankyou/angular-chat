import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RequestService} from "../request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent implements OnInit {

  checkoutForm: FormGroup = new FormGroup({
    name: new FormControl()
  });

  constructor(private request: RequestService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Nickname: ', this.checkoutForm.value);
    console.log(localStorage.getItem('idclick'));
    this.request.addMember(localStorage.getItem('idclick'), 'You', this.checkoutForm.value);
    this.request.pushNoti('Bạn vừa vào 1 nhóm');
    this.router.navigate(['/']);
  }
}
