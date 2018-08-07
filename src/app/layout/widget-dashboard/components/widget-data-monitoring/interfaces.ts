export interface IWidgetData {
  Category: string;
  Status: string;
}

export interface ICategoryTotal {
  Category: string;
  TotalCount: number;
}

export interface IColumn {
  name: string;
  checked: boolean;
}

export interface IStatus {
  name: string;
  checked: boolean;
}

export interface ISettingsModel {
  availableStatuses: Array<IStatus>;
  filterByStatus: boolean;
  dials: object;
  columnList: Array<IColumn>;
}
