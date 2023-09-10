import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UppyAngularDashboardModule } from '@uppy/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UppyAngularDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
