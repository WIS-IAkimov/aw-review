import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategoryTotal } from '../widget-data-monitoring/interfaces';

@Component({
  selector: 'app-radial-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.scss']
})
export class ProgressBarComponent {
  size = 120;
  strokeWidth = 8;
  radius = this.size / 2;
  dasharray = 2 * Math.PI * (this.radius - (this.strokeWidth / 2));
  color: '#d4bd4f';

  @Input('data') data: ICategoryTotal;
  @Input('total') total: number;
  @Input('isActive') isActive: boolean;
  @Input('dialName') dialName: string;
  @Output()
  chooseCategory: EventEmitter<string> = new EventEmitter();

  handleClick() {
    this.chooseCategory.emit(this.dialName);
  }

  private get viewBox(): string {
    return `0 0 ${this.size} ${this.size}`;
  }

  private get percent() {
    if (this.data && this.total) {
      return (this.data.TotalCount / this.total * 100).toFixed(0);
    }

    return 0;
  }
}
