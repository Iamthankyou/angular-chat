import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../selection.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit{

	selection : SelectionService;
	request : RequestService;
  listConvos: any;
  title: any;
  member = 1;
  listMember: any;

  constructor(selection : SelectionService, request : RequestService) {
		this.selection = selection;
		this.request = request;
  }


  deselect(): void {
    this.selection.setActiveConvo(null);
  }


  leaveGroup() {
    this.request.removeMember(localStorage.getItem('idclick'),'You');
    // this.request.pushNoti('Bạn vừa rời nhóm');
  }

  giveMe(){
    this.title = localStorage.getItem('title');
    this.member = this.request.getConvosFromRequest()[localStorage.getItem('idclick')].member.length;
    this.listMember = this.request.getConvosFromRequest()[localStorage.getItem('idclick')].member;
  }

  ngOnInit(): void {
    console.log(this.title);
    setInterval(this.giveMe.bind(this), 1000);
    this.member = this.request.getConvosFromRequest()[localStorage.getItem('idclick')].member.length;
    this.listMember = this.request.getConvosFromRequest()[localStorage.getItem('idclick')].member;
  }

}
