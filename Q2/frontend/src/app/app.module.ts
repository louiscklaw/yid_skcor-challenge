import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { FooterComponent } from './footer/main.component';
import { NewEventDrawerComponent } from './new-message-drawer/main.component';
import { EventListComponent } from './message-list/main.component';
import { MiniDashboardComponent } from './mini-dashboard/main.component';
import { HeaderComponent } from './header/header.component';
import { HighCountComponent } from './mini-dashboard/high-count/main.component';
import { NormalCountComponent } from './mini-dashboard/normal-count/main.component';
import { LowCountComponent } from './mini-dashboard/low-count/main.component';
import { HighEventComponent } from './message-list/high-event/main.component';
import { NormalEventComponent } from './message-list/normal-event/main.component';
import { LowEventComponent } from './message-list/low-event/main.component';
import { DeleteEventButtonComponent } from './message-list/delete-event-button/main.component';
import { ErrTooManyRequestsComponent } from './new-message-drawer/err-too-many-requests/main.component';
import { DeleteSuccessComponent } from './delete-success/main.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NewEventDrawerComponent,
    EventListComponent,
    MiniDashboardComponent,
    HeaderComponent,
    HighCountComponent,
    NormalCountComponent,
    LowCountComponent,
    HighEventComponent,
    NormalEventComponent,
    LowEventComponent,
    DeleteEventButtonComponent,
    ErrTooManyRequestsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteSuccessComponent,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
