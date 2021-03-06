import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { IWidgetData, ICategoryTotal } from './components/data-monitoring-widget/interfaces';
import { IWidgets } from './interfaces';

const observable1 = Observable.create(function (observer) {
  observer.next([
    {
      'FieldA': 'A1',
      'FieldB': 'B1',
      'FieldC': 'C1',
      'FieldD': 'D1',
      'FieldE': 'E1',
      'FieldF': 'F1',
      'FieldG': 'G1',
      'FieldH': 'H1',
      'FieldI': 'I1',
      'FieldJ': 'J1',
      'FieldK': 'K1',
      'Category': 'X1',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A2',
      'FieldB': 'B2',
      'FieldC': 'C2',
      'FieldD': 'D2',
      'FieldE': 'E2',
      'FieldF': 'F2',
      'FieldG': 'G2',
      'FieldH': 'H2',
      'FieldI': 'I2',
      'FieldJ': 'J2',
      'FieldK': 'K2',
      'Category': 'X1',
      'Status': 'Assigned'
    },
    {
      'FieldA': 'A3',
      'FieldB': 'B3',
      'FieldC': 'C3',
      'FieldD': 'D3',
      'FieldE': 'E3',
      'FieldF': 'F3',
      'FieldG': 'G3',
      'FieldH': 'H3',
      'FieldI': 'I3',
      'FieldJ': 'J3',
      'FieldK': 'K3',
      'Category': 'X1',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A4',
      'FieldB': 'B4',
      'FieldC': 'C4',
      'FieldD': 'D4',
      'FieldE': 'E4',
      'FieldF': 'F4',
      'FieldG': 'G4',
      'FieldH': 'H4',
      'FieldI': 'I4',
      'FieldJ': 'J4',
      'FieldK': 'K4',
      'Category': 'X2',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A5',
      'FieldB': 'B5',
      'FieldC': 'C5',
      'FieldD': 'D5',
      'FieldE': 'E5',
      'FieldF': 'F5',
      'FieldG': 'G5',
      'FieldH': 'H5',
      'FieldI': 'I5',
      'FieldJ': 'J5',
      'FieldK': 'K5',
      'Category': 'X2',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A6',
      'FieldB': 'B6',
      'FieldC': 'C6',
      'FieldD': 'D6',
      'FieldE': 'E6',
      'FieldF': 'F6',
      'FieldG': 'G6',
      'FieldH': 'H6',
      'FieldI': 'I6',
      'FieldJ': 'J6',
      'FieldK': 'K6',
      'Category': 'X2',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A7',
      'FieldB': 'B7',
      'FieldC': 'C7',
      'FieldD': 'D7',
      'FieldE': 'E7',
      'FieldF': 'F7',
      'FieldG': 'G7',
      'FieldH': 'H7',
      'FieldI': 'I7',
      'FieldJ': 'J7',
      'FieldK': 'K7',
      'Category': 'X3',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A8',
      'FieldB': 'B8',
      'FieldC': 'C8',
      'FieldD': 'D8',
      'FieldE': 'E8',
      'FieldF': 'F8',
      'FieldG': 'G8',
      'FieldH': 'H8',
      'FieldI': 'I8',
      'FieldJ': 'J8',
      'FieldK': 'K8',
      'Category': 'X3',
      'Status': 'Assigned'
    },
    {
      'FieldA': 'A9',
      'FieldB': 'B9',
      'FieldC': 'C9',
      'FieldD': 'D9',
      'FieldE': 'E9',
      'FieldF': 'F9',
      'FieldG': 'G9',
      'FieldH': 'H9',
      'FieldI': 'I9',
      'FieldJ': 'J9',
      'FieldK': 'K9',
      'Category': 'X3',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A10',
      'FieldB': 'B10',
      'FieldC': 'C10',
      'FieldD': 'D10',
      'FieldE': 'E10',
      'FieldF': 'F10',
      'FieldG': 'G10',
      'FieldH': 'H10',
      'FieldI': 'I10',
      'FieldJ': 'J10',
      'FieldK': 'K10',
      'Category': 'X1',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A11',
      'FieldB': 'B11',
      'FieldC': 'C11',
      'FieldD': 'D11',
      'FieldE': 'E11',
      'FieldF': 'F11',
      'FieldG': 'G11',
      'FieldH': 'H11',
      'FieldI': 'I11',
      'FieldJ': 'J11',
      'FieldK': 'K11',
      'Category': 'X1',
      'Status': 'Assigned'
    },
    {
      'FieldA': 'A12',
      'FieldB': 'B12',
      'FieldC': 'C12',
      'FieldD': 'D12',
      'FieldE': 'E12',
      'FieldF': 'F12',
      'FieldG': 'G12',
      'FieldH': 'H12',
      'FieldI': 'I12',
      'FieldJ': 'J12',
      'FieldK': 'K12',
      'Category': 'X1',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A13',
      'FieldB': 'B13',
      'FieldC': 'C13',
      'FieldD': 'D13',
      'FieldE': 'E13',
      'FieldF': 'F13',
      'FieldG': 'G13',
      'FieldH': 'H13',
      'FieldI': 'I13',
      'FieldJ': 'J13',
      'FieldK': 'K13',
      'Category': 'X2',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A14',
      'FieldB': 'B14',
      'FieldC': 'C14',
      'FieldD': 'D14',
      'FieldE': 'E14',
      'FieldF': 'F14',
      'FieldG': 'G14',
      'FieldH': 'H14',
      'FieldI': 'I14',
      'FieldJ': 'J14',
      'FieldK': 'K14',
      'Category': 'X2',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A15',
      'FieldB': 'B15',
      'FieldC': 'C15',
      'FieldD': 'D15',
      'FieldE': 'E15',
      'FieldF': 'F15',
      'FieldG': 'G15',
      'FieldH': 'H15',
      'FieldI': 'I15',
      'FieldJ': 'J15',
      'FieldK': 'K15',
      'Category': 'X2',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A16',
      'FieldB': 'B16',
      'FieldC': 'C16',
      'FieldD': 'D16',
      'FieldE': 'E16',
      'FieldF': 'F16',
      'FieldG': 'G16',
      'FieldH': 'H16',
      'FieldI': 'I16',
      'FieldJ': 'J16',
      'FieldK': 'K16',
      'Category': 'X2',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A17',
      'FieldB': 'B17',
      'FieldC': 'C17',
      'FieldD': 'D17',
      'FieldE': 'E17',
      'FieldF': 'F17',
      'FieldG': 'G17',
      'FieldH': 'H17',
      'FieldI': 'I17',
      'FieldJ': 'J17',
      'FieldK': 'K17',
      'Category': 'X3',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A18',
      'FieldB': 'B18',
      'FieldC': 'C18',
      'FieldD': 'D18',
      'FieldE': 'E18',
      'FieldF': 'F18',
      'FieldG': 'G18',
      'FieldH': 'H18',
      'FieldI': 'I18',
      'FieldJ': 'J18',
      'FieldK': 'K18',
      'Category': 'X3',
      'Status': 'Assigned'
    },
    {
      'FieldA': 'A19',
      'FieldB': 'B19',
      'FieldC': 'C19',
      'FieldD': 'D19',
      'FieldE': 'E19',
      'FieldF': 'F19',
      'FieldG': 'G19',
      'FieldH': 'H19',
      'FieldI': 'I19',
      'FieldJ': 'J19',
      'FieldK': 'K19',
      'Category': 'X3',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A20',
      'FieldB': 'B20',
      'FieldC': 'C20',
      'FieldD': 'D20',
      'FieldE': 'E20',
      'FieldF': 'F20',
      'FieldG': 'G20',
      'FieldH': 'H20',
      'FieldI': 'I20',
      'FieldJ': 'J20',
      'FieldK': 'K20',
      'Category': 'X3',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A20',
      'FieldB': 'B20',
      'FieldC': 'C20',
      'FieldD': 'D20',
      'FieldE': 'E20',
      'FieldF': 'F20',
      'FieldG': 'G20',
      'FieldH': 'H20',
      'FieldI': 'I20',
      'FieldJ': 'J20',
      'FieldK': 'K20',
      'Category': 'X4',
      'Status': 'Closed'
    },
    {
      'FieldA': 'A20',
      'FieldB': 'B20',
      'FieldC': 'C20',
      'FieldD': 'D20',
      'FieldE': 'E20',
      'FieldF': 'F20',
      'FieldG': 'G20',
      'FieldH': 'H20',
      'FieldI': 'I20',
      'FieldJ': 'J20',
      'FieldK': 'K20',
      'Category': 'X4',
      'Status': 'Pending'
    },
    {
      'FieldA': 'A20',
      'FieldB': 'B20',
      'FieldC': 'C20',
      'FieldD': 'D20',
      'FieldE': 'E20',
      'FieldF': 'F20',
      'FieldG': 'G20',
      'FieldH': 'H20',
      'FieldI': 'I20',
      'FieldJ': 'J20',
      'FieldK': 'K20',
      'Category': 'X4',
      'Status': 'Assigned'
    },
  ]);
});

const observable2 = Observable.create(function (observer) {
  observer.next([
    {
      'Category': 'X1',
      'TotalCount': 6
    },
    {
      'Category': 'X2',
      'TotalCount': 7
    },
    {
      'Category': 'X3',
      'TotalCount': 7
    },
    {
      'Category': 'X4',
      'TotalCount': 3
    }
  ]);
});

@Component({
  selector: 'app-widget-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private widgetData$: Observable<IWidgetData[]>;
  private widgetDataCounter$: Observable<ICategoryTotal[]>;

  private options: GridsterConfig;
  private widgets: IWidgets;
  private initGridSize: number;

  @ViewChild('gridster') gridster: any;
  @ViewChildren('dashboardWidget') dashboardWidgets: QueryList<any>;

  constructor() {
    this.widgets = {};
    this.initGridSize = 24;

    this.widgets.widget1 = {
      cols: this.calculateInPercent(40), // width relative to container
      rows: this.calculateInPercent(20), // height relative to container
      y: 0, // Y-position relative to container
      x: 0, // X-position relative to container
      minItemRows: 5
    };

    this.widgets.widget2 = {
      cols: this.calculateInPercent(20),
      rows: this.calculateInPercent(20),
      y: this.calculateInPercent(20),
      x: 0
    };
  }

  calculateInPercent(percent: number) {
    return Math.round(this.initGridSize * (Math.min(percent, 100) / 100));
  }

  ngOnInit() {
    this.widgetData$ = observable1;
    this.widgetDataCounter$ = observable2;

    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      mobileBreakpoint: 640,
      minCols: this.initGridSize,
      maxCols: 100,
      minRows: this.initGridSize,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 2,
      maxItemRows: 100,
      minItemRows: 2,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContent: true,
        dragHandleClass: 'drag-handler',
        dropOverItems: true,
      },
      resizable: {
        enabled: true,
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    console.log('Dashboard initialized');
  }

  findCollisions(currentWidget) {
    const widgets = this.dashboardWidgets.toArray().filter((widget) => {
      if (currentWidget.x === widget.item.x && currentWidget.y === widget.item.y) {
        return false;
      }

      const isCollisionX = widget.item.x + widget.item.cols > currentWidget.x;
      const isCollisionY = widget.item.y < currentWidget.y + currentWidget.rows + 3;

      return isCollisionX && isCollisionY;
    });

    return widgets;
  }

  resizeWidget(event, wgt) {
    const currentWidget = this.dashboardWidgets.toArray().find((w) => {
      return w.item.x === wgt.x && w.item.y === wgt.y;
    });

    const widgetsWithCollision = this.findCollisions(wgt);

    if (event.expand) {
      currentWidget.$item.rows += 3;
      currentWidget.item.rows += 3;

      widgetsWithCollision.forEach((w) => {
        const rows = ((currentWidget.$item.y + currentWidget.$item.rows) - w.$item.y);

        w.$item.y += rows;
        w.item.y += rows;
      });
    } else {
      currentWidget.$item.rows -= 3;
      currentWidget.item.rows -= 3;

      widgetsWithCollision.forEach((w) => {
        const rows = (w.$item.y - (currentWidget.$item.y + currentWidget.$item.rows));

        w.$item.y -= rows;
        w.item.y -= rows;
      });
    }

    this.gridster.calculateLayoutDebounce();
  }
}
