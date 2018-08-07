import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IWidgetData, ICategoryTotal, IColumn, IStatus, ISettingsModel } from './interfaces';

function createStatus(name): IStatus {
  return {name, checked: false};
}

function deepCopy(src): any {
  return JSON.parse(JSON.stringify(src));
}

@Component({
  selector: 'app-widget-card',
  templateUrl: 'widget.component.html',
  styleUrls: ['widget.component.scss'],
})
export class WidgetComponent implements OnInit, OnChanges, OnDestroy {
  @Input('data$') data$: Observable<IWidgetData[]>;
  @Input('categoryList$') categoryList$: Observable<ICategoryTotal[]>;
  @Input('widgetName') widgetName: string;

  subscriptionDataList: Subscription;
  subscriptionCategoryList: Subscription;

  data: Array<IWidgetData>;
  categoryList: Array<ICategoryTotal>;
  statusColors: object;
  activeDial: string;
  settingsState: ISettingsModel;
  editSettingsState: ISettingsModel;

  constructor(private modalService: NgbModal) {
    const statuses = ['Pending', 'Assigned', 'Closed'];

    this.settingsState = {
      availableStatuses: statuses.map(status => createStatus(status)),
      filterByStatus: false,
      dials: {
        dial1: {Category: '', TotalCount: 0},
        dial2: {Category: '', TotalCount: 0},
        dial3: {Category: '', TotalCount: 0}
      },
      columnList: []
    };

    this.editSettingsState = deepCopy(this.settingsState);

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

  private setCategoryList = (data) => {
    if (data !== undefined) {
      this.categoryList = data;
      this.settingsState.dials.dial1 = this.categoryList[0];
      this.settingsState.dials.dial2 = this.categoryList[1];
      this.settingsState.dials.dial3 = this.getOtherCategories('dial3');

      this.editSettingsState.dials = deepCopy(this.settingsState.dials);
    } else {
      console.error('category list from Observable is undefined');
    }
  }

  private normalizeData = (data) => {
    if (data !== undefined) {
      this.data = data;
      this.settingsState.columnList = Object.keys(data[0]).map((col, index) => ({name: col, checked: true}));
      this.editSettingsState = deepCopy(this.settingsState);
    } else {
      console.error('data from Observable is undefined');
    }
  }

  private openSettings(popupContent) {
    this.modalService.open(popupContent, { centered: true, size: 'sm' });
  }

  private saveSettings(close) {
    this.settingsState = deepCopy(this.editSettingsState);
    close();
  }

  private chooseCategory(dial: string) {
    if (this.activeDial === dial) {
      this.activeDial = null;
    } else {
      this.activeDial = dial;
    }
  }

  private getOtherDials(targetDial) {
    const dials = Object.keys(this.settingsState.dials);
    const indexTargetDial = dials.indexOf(targetDial);
    dials.splice(indexTargetDial, 1);

    return dials;
  }

  private getOptions(targetDial) {
    const dials = this.getOtherDials(targetDial);
  }

  private getOtherCategories(targetDial): ICategoryTotal {
    const dials = this.getOtherDials(targetDial);
    const choosedCategories = dials.map(dial => this.settingsState.dials[dial].Category);

    const otherCategoriesTotal = this.categoryList
      .filter((category) => {
        return !choosedCategories.includes(category.Category);
      })
      .reduce((total, category) => total + category.TotalCount, 0);

    return {Category: 'Other', TotalCount: otherCategoriesTotal};
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
