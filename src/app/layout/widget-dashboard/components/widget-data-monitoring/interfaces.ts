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

export interface IDials {
  dial1: ICategoryTotal;
  dial2: ICategoryTotal;
  dial3: ICategoryTotal;
}

export interface ISettingsModel {
  availableStatuses: Array<IStatus>;
  filterByStatus: boolean;
  dials: IDials;
  columnList: Array<IColumn>;
}
