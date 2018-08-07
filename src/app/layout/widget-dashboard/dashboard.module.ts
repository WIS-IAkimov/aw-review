import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { WidgetComponent } from './components/widget-data-monitoring/widget.component';
import { WidgetService } from './components/widget-data-monitoring/widget.service';
import { ProgressBarComponent } from './components/radial-progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    WidgetComponent,
    ProgressBarComponent
  ],
  providers: [
    WidgetService
  ],
  exports: [
    DashboardComponent,
    WidgetComponent
  ]
})
export class WidgetDashboardModule { }
