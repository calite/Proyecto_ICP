import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

// import {MatCardModule} from '@angular/material/card'
// import { DialogModule } from '@angular/cdk/dialog';
// import {MatIconModule} from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { ImageModule } from 'primeng/image';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,//peticiones http
    SharedModule,
    PagesModule,
    // MatDialogModule,
    // DialogModule,
    // MatCardModule,
    // MatIconModule,
    // ImageModule,
    

    NgxAwesomePopupModule.forRoot({
      colorList: {
        success: '#3caea3', // optional
        info: '#2f8ee5', // optional
        warning: '#ffc107', // optional
        danger: '#e46464', // optional
        customOne: '#3ebb1a', // optional
        customTwo: '#bd47fa', // optional (up to custom five)
      },
    }),
    ConfirmBoxConfigModule.forRoot(),
    DialogConfigModule.forRoot(), // optional
    ToastNotificationConfigModule.forRoot(), // optional
  ],
  exports: [
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    // DialogModule,
    // MatCardModule,
    // MatIconModule,
    // ImageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
