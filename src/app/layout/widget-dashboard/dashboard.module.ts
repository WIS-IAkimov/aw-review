import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { GridsterModule } from 'angular-gridster2';

import { DashboardComponent } from './dashboard.component';
import { WidgetComponent } from './components/data-monitoring-widget/widget.component';
import { CapitalizePipe } from './capitalize.pipe';
import { ProgressBarComponent } from './components/radial-progress-bar/progress-bar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    GridsterModule,
    DragulaModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    WidgetComponent,
    ProgressBarComponent,
    CapitalizePipe,
    DropdownComponent
  ],
  providers: [],
  exports: [
    DashboardComponent,
    WidgetComponent
  ]
})
export class WidgetDashboardModule { }
