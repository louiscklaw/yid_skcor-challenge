import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MessageTableComponent } from './message-table/message-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageFormInputComponent } from './message-form-input/message-form-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './err-dialog-429/err_dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MessageTableComponent,
    MessageFormInputComponent,
    //
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    //
    MatTableModule,
    MatPaginatorModule,
    //
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    //
    MatSelectModule,
    //
    MatDialogModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
