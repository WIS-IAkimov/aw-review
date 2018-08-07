import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WidgetDashboardModule } from './layout/widget-dashboard/dashboard.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WidgetDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
