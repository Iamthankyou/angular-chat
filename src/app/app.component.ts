import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';

import {SelectionService} from './selection.service';
import {RequestService} from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  header: object;
  selection: SelectionService;
  request: RequestService;

  deselect(): void {
    this.selection.setActiveConvo(null);
  }

  strInput(): void {
    const str = $('#message-input').val();
    $('#message-input').val('');
    $('#message-input').blur();
    if (str) {
      if (this.request.sendMessageFromRequest(str as string, this.selection.activeConvo)) {
        this.scrollDown();
        this.update();
      }
    }
  }

  update(): void {
    if (this.request.shouldUpdateFromRequest()) {
      this.request.getConversationFromRequest(this.selection.activeConvo, true);
      this.request.getConvosFromRequest(true);
      this.header = this.request.getHeaderFromRequest(this.selection.activeConvo);
    }

    if (Math.random()*10 < 2){
      this.autoSend();
    }

    if (Math.random()*15 < 2){
      this.autoAddMem();
    }
  }

  getNextConversationPage(): void {
    this.request.loadNextConversationFromRequest();
  }

  getNextConvosPage(): void {
    this.request.loadNextConvosFromRequest();
  }

  scrollDown(): void {
    $('#conversation-view').scrollTop($('#conversation-view')[0].scrollHeight);
  }

  getViewHeight(): string {
    const heightOffset = $('#text-input-div').outerHeight() + $('#desktop-navbar').outerHeight();
    return ($('#mobile-content').height() - heightOffset) + 'px';
  }

  getPaddingTop(): string {
    return $('#mobile-navbar').height() + 'px';
  }

  onConversationChange(): void {
    this.selection.activeMessage = null;
    this.header = this.request.getHeaderFromRequest(this.selection.activeConvo);
    $('#message-input').val('');
    setTimeout(this.scrollDown.bind(this), 0);
  }

  autoSend() {
    // const n = this.request.getConvosFromRequest().length;
    this.request.sendMessageFromRequestFake('Auto Scam. Auto Scam, You can even use emojis in it 😋', 1, 'Putin');

    if (this.request.getConvosFromRequest()[1].member.find(o => o.name === 'You') !== undefined) {
      this.request.pushNoti('Putin vừa nhắn vào nhóm');
    }
  }

  autoAddMem(){
    this.request.addMember(1, 'Trương Tam Phong', 'Trương Tam Phong');

    if (this.request.getConvosFromRequest()[1].member.find(o => o.name === 'You') !== undefined) {
      this.request.pushNoti('Trương Tam Phong vừa tham gia nhóm');
    }
  }

  ngOnInit() {
    setInterval(this.update.bind(this), 1000);
    // setTimeout(this.autoSend.bind(this), 1000);
    // localStorage.clear();
  }

  constructor(selection: SelectionService, request: RequestService) {
    this.selection = selection;
    this.selection.onConversationChange = this.onConversationChange.bind(this);
    this.request = request;
    this.header = this.request.getHeaderFromRequest(null);
  }
}
