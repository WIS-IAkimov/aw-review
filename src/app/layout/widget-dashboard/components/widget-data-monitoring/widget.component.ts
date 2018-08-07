import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IWidgetData, ICategoryTotal, IColumn, IStatus, ISettingsModel } from './interfaces';
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
  // columnList: Array<IColumn>;
  // availableStatuses: Array<IStatus>;
  // filterByStatus: boolean;
  // dials: object;
  categoryList: Array<ICategoryTotal>;
  statusColors: object;
  activeDial: string;
  settingsState: ISettingsModel;
  editSettingsState: ISettingsModel;

  constructor(private widgetService: WidgetService, private modalService: NgbModal) {
    this.settingsState = {
      availableStatuses: [
        {
          name: 'Pending',
          checked: true
        },
        {
          name: 'Assigned',
          checked: false
        },
        {
          name: 'Closed',
          checked: false
        }
      ],
      filterByStatus: true,
      dials: {
        dial1: {Category: 'X1', TotalCount: 6},
        dial2: {Category: 'X2', TotalCount: 6},
        dial3: {Category: 'Other', TotalCount: 6}
      },
      columnList: []
    };

    this.editSettingsState = JSON.parse(JSON.stringify(this.settingsState));

    this.statusColors = {
      'Pending': '#ff0000',
      'Assigned': '#ffa500',
      'Closed': '#10a710'
    };

    this.activeDial = null;
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
      this.settingsState.columnList = Object.keys(data[0]).map((col, index) => ({name: col, checked: true}));
      this.editSettingsState = JSON.parse(JSON.stringify(this.settingsState));
    } else {
      console.error('data from Observable is undefined');
    }
  }

  openSettings(popupContent) {
    this.modalService.open(popupContent, { centered: true, size: 'sm' });
  }

  saveSettings(close) {
    this.settingsState = JSON.parse(JSON.stringify(this.editSettingsState));
    close();
  }

  chooseCategory(dial: string) {
    if (this.activeDial === dial) {
      this.activeDial = null;
    } else {
      this.activeDial = dial;
    }
  }

  private onFilterByStatus(event) {
    const isAllStatusesFalse = !this.editSettingsState.availableStatuses.filter((status) => status.checked).length;

    if (event && isAllStatusesFalse) {
      this.editSettingsState.availableStatuses[0].checked = true;
    }
  }

  private changeStatusFilter(event, statusName) {
    if (this.editSettingsState.filterByStatus) {
      const currentStatus = this.editSettingsState.availableStatuses.find((status) => status.name === statusName);
      const isFalseState = currentStatus.checked;
      const isAllStatusesFalse = !(this.editSettingsState.availableStatuses.filter((status) => status.checked).length > 1);

      if (isFalseState && isAllStatusesFalse) {
        event.preventDefault();
        event.stopPropagation();
        currentStatus.checked = true;

        return;
      }
    }
  }

  private toggleColumnState(colName) {
    const column = this.editSettingsState.columnList.find((col) => col.name === colName);

    column.checked = !column.checked;
  }

  private getStatusColor(status) {
    return this.statusColors[status];
  }

  private get _columns(): Array<string> {
    return this.settingsState.columnList.filter((col) => col.checked).map((col) => col.name);
  }

  private get _data() {
    const newData = this.data
      .filter((data) => {
        const activeCategory = this.settingsState.dials[this.activeDial].Category;

        if (activeCategory === 'Other') {
          const {[this.activeDial]: currentDial, ...otherDials} = this.settingsState.dials;
          const otherCategory = Object.keys(otherDials).map((key) => otherDials[key].Category);

          if (!otherCategory.includes(data.Category)) {
            return true;
          } else {
            return false;
          }
        } else {
          return data.Category === this.settingsState.dials[this.activeDial].Category;
        }
      })
      .filter((data) => {
        if (!this.settingsState.filterByStatus) {
          return true;
        }

        const statusIsActive = this.settingsState.availableStatuses.find((status) => status.name === data.Status && status.checked);

        return statusIsActive;
      });

    return newData;
  }
}
