import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IWidgetData, ICategoryTotal, IColumn } from './interfaces';
import { WidgetService } from './widget.service';

@Component({
  selector: 'app-widget-card',
  templateUrl: 'widget.component.html',
  styleUrls: ['widget.component.scss']
})
export class WidgetComponent implements OnInit, OnChanges, OnDestroy {
  @Input('data$') data$: Observable<IWidgetData[]>;
  @Input('categoryList$') categoryList$: Observable<ICategoryTotal[]>;
  @Input('widgetName') widgetName: string;

  subscriptionDataList: Subscription;
  subscriptionCategoryList: Subscription;

  data: Array<IWidgetData>;
  columnList: Array<IColumn>;
  categoryList: Array<ICategoryTotal>;
  availableStatuses: Array<string>;
  checkedStatuses: Array<string>;
  statusColors: object;
  dials: object;
  activeDial: string;

  constructor(private widgetService: WidgetService, private modalService: NgbModal) {
    this.availableStatuses = ['Pending', 'Assigned', 'Closed'];
    this.checkedStatuses = ['Pending'];

    this.statusColors = {
      'Pending': '#ff0000',
      'Assigned': '#ffa500',
      'Closed': '#10a710'
    };

    this.activeDial = null;

    this.dials = {
      dial1: {Category: 'X1', TotalCount: 6},
      dial2: {Category: 'X2', TotalCount: 6},
      dial3: {Category: 'Other', TotalCount: 6}
    };
  }

  ngOnInit() {
    console.log('Widget initialized');
  }

  ngOnDestroy() {
    this.subscriptionDataList.unsubscribe();
    this.subscriptionCategoryList.unsubscribe();
  }

  ngOnChanges() {
    if (this.data$ && !this.subscriptionDataList) {
      this.subscriptionDataList = this.data$.subscribe(this.normalizeData);
    }

    if (this.categoryList$ && !this.subscriptionCategoryList) {
      this.subscriptionCategoryList = this.categoryList$.subscribe(this.setCategoryList);
    }
  }

  setCategoryList = (data) => {
    if (data !== undefined) {
      this.categoryList = data;
    } else {
      console.error('category list from Observable is undefined');
    }
  }

  normalizeData = (data) => {
    if (data !== undefined) {
      this.data = data;
      this.columnList = Object.keys(data[0]).map((col, index) => ({name: col, checked: true}));
    } else {
      console.error('data from Observable is undefined');
    }
  }

  openSettings(popupContent) {
    this.modalService.open(popupContent, { centered: true, size: 'sm' });
  }

  saveSettings(close) {
    console.log('Save!');
    close();
  }

  chooseCategory(dial: string) {
    if (this.activeDial === dial) {
      this.activeDial = null;
    } else {
      this.activeDial = dial;
      console.log(dial, 'choose category');
    }
  }

  private getStatusColor(status) {
    return this.statusColors[status];
  }

  private get _columns(): Array<string> {
    return this.columnList.filter((col) => col.checked).map((col) => col.name);
  }

  private get _data() {
    const newData = this.data
      .filter((data) => {
        const activeCategory = this.dials[this.activeDial].Category;

        if (activeCategory === 'Other') {
          const {[this.activeDial]: currentDial, ...otherDials} = this.dials;
          const otherCategory = Object.keys(otherDials).map((key) => otherDials[key].Category);

          if (!otherCategory.includes(data.Category)) {
            return true;
          } else {
            return false;
          }
        } else {
          return data.Category === this.dials[this.activeDial].Category;
        }
      })
      .filter((data) => this.checkedStatuses.includes(data.Status));

    return newData;
  }
}
