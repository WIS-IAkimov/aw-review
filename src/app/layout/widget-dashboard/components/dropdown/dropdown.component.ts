import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategoryTotal } from '../widget-data-monitoring/interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss']
})
export class DropdownComponent {
  @Input('value') value: string;
  @Input('key') key: string;
  @Input('options') options: Array<string>;
  @Output('change') change: EventEmitter<any>;

  constructor() {
    this.change = new EventEmitter();
  }

  onClick(value) {
    this.change.emit(value);
  }
}
