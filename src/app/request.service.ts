import {Injectable, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Requests} from './requests';

@Injectable({
  providedIn: 'root'
})
  export class RequestService {

  sanitizer: DomSanitizer;

  lastUser: any;
  lastConvosPage = 0;
  lastConvos: any[];
  lastConversationId: any;
  lastConversationPage = 0;
  lastConversation: any[] = [];

  getHeaderFromRequest(conversationId: any): any {
    return Requests.getHeader(conversationId);
  }

  getPlaceholderFromRequest(conversationId: any): string {
    if (conversationId !== null) {
      return Requests.getPlaceholderText(conversationId);
    }

    return '';
  }

  getConvosFromRequest(forceUpdate: boolean = false): any[] {
    const userId = Requests.getUserId();
    if (this.lastUser !== userId || forceUpdate) {
      this.lastUser = userId;
      this.lastConvosPage = 0;
      Requests.getConvos(this.getConvosCallback.bind(this), userId, this.lastConvosPage);
    }

    return this.lastConvos;
  }

  getConvosCallback(convos: any[]): void {
    this.lastConvos = convos;
    for (const convo of this.lastConvos) {
      convo.safeImg = this.sanitizer.sanitize(SecurityContext.URL, convo.img);
    }
  }

  loadNextConvosFromRequest(): void {
    this.lastConvosPage++;
    Requests.getConvos(this.loadNextConvosCallback.bind(this), Requests.getUserId(), this.lastConvosPage);
  }

  loadNextConvosCallback(convos: any[]): void {
    for (const convo of convos) {
      convo.safeImg = this.sanitizer.sanitize(SecurityContext.URL, convo.img);
    }
    this.lastConvos.push.apply(this.lastConvos, convos);
  }

  searchConvosFromRequest(callback, searchTerm: string): void {
    Requests.searchConvos(((results) => this.searchConvosCallback(callback, results)).bind(this), Requests.getUserId(), searchTerm, 0);
  }

  searchConvosCallback(callback, results: any[]): void {
    for (const result of results) {
      result.safeImg = this.sanitizer.sanitize(SecurityContext.URL, result.img);
    }

    callback(results.length === 0 ? [null] : results);
  }

  getConversationFromRequest(activeConvo: any, forceUpdate: boolean = false): any[] {
    if (activeConvo === null) {
      this.lastConversationId = null;
      this.lastConversation = [];
    } else if (this.lastConversationId !== activeConvo || forceUpdate) {
      this.lastConversationPage = 0;
      Requests.getConversation(((c) => this.getConversationCallback(c, this.lastConversationId !== activeConvo)).bind(this), Requests.getUserId(), activeConvo, this.lastConversationPage);
      this.lastConversationId = activeConvo;
    }

    // console.log(this.lastConversation);

    return this.lastConversation;
  }

  addMember(id: any, na: string, ni: string) {
    console.log('This is add member');
    console.log(this.lastConvos[id].member);
    this.lastConvos[id].member.push({name: na, nick: ni});
    console.log(this.lastConvos[id]);
  }

  removeMember(id: any, na: string) {
    console.log('This is remove member');
    // console.log(this.lastConvos[id].member);
    this.lastConvos[id].member = this.lastConvos[id].member.filter(x => x.name !== 'You');
    console.log(this.lastConvos[id]);
  }

  getConversationCallback(conversation: any[], noKeep: boolean): void {
    this.prepareConversation(conversation);

    if (this.lastConversation.length === 0 || noKeep) {
      this.lastConversation = conversation;
      return;
    }

    let index = 0;
    for (const i in conversation) {
      if (conversation[i].id === this.lastConversation[this.lastConversation.length - 1].id) {
        index = +i;
        break;
      }
    }

    for (const i in conversation) {
      if (+i <= index) {
        this.lastConversation[this.lastConversation.length + (+i - index) - 1] = conversation[i];
      } else {
        this.lastConversation.push(conversation[i]);
      }
    }
  }

  loadNextConversationFromRequest(): void {
    this.lastConversationPage++;
    Requests.getConversation(this.loadNextConversationCallback.bind(this), Requests.getUserId(), this.lastConversationId, this.lastConversationPage);
  }

  loadNextConversationCallback(conversation: any[]): void {
    this.prepareConversation(conversation);
    this.lastConversation.unshift.apply(this.lastConversation, conversation);
  }

  sendMessageFromRequest(message: string, conversationId: any): boolean {
    return Requests.sendMessage(message, conversationId);
  }

  sendMessageFromRequestFake(message: string, conversationId: any, name: string): boolean {
    return Requests.sendMessageFake(message, conversationId, name);
  }

  getNoti() {
    return Requests.getNotify();
  }

  pushNoti(message) {
    Requests.pushNotify(message);
  }

  shouldUpdateFromRequest(): boolean {
    return Requests.shouldUpdate(Requests.getUserId());
  }

  private prepareConversation(conversation: any[]): void {
    for (const i in conversation) {
      conversation[i].inChain = (+i > 0 && conversation[+i - 1].author == conversation[i].author);
      if (conversation[i].type === 'image') {
        conversation[i].safeContentUrl = this.sanitizer.sanitize(SecurityContext.URL, conversation[i].content);
        conversation[i].safeContentStyle = this.sanitizer.sanitize(SecurityContext.STYLE, 'url(' + conversation[i].content + ')');
      }
    }
  }

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

}
