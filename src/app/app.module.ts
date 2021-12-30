import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { ConvoListComponent } from './convo-list/convo-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConvoSingleComponent } from './convo-single/convo-single.component';
import { MessageComponent } from './message/message.component';
import { SelectionService } from './selection.service';
import {RouterModule, Routes} from '@angular/router';
import { JoinGroupComponent } from './join-group/join-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { MainComponent } from './main/main.component';

import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: '', component: ConversationComponent },
  { path: 'join', component: JoinGroupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ConvoListComponent,
    ConversationComponent,
    ConvoSingleComponent,
    MessageComponent,
    JoinGroupComponent,
    MainComponent
  ],
  imports: [
    MatSliderModule,
    BrowserModule, InfiniteScrollModule, RouterModule, ReactiveFormsModule, FormsModule, RouterModule.forRoot(routes), NoopAnimationsModule
  ],
  providers: [SelectionService, {provide: APP_BASE_HREF, useValue : '/' }],

  bootstrap: [AppComponent]
})
export class AppModule { }
