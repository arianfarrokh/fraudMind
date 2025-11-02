import { GridPaginationModel } from '@mui/x-data-grid'

export { default as DataGridViewServer } from './DataGridViewServer'
export { default as AddNewToolbar } from './AddNewToolbar'
export { default as singleSelectOperators} from './single-select-operators'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OnPageChangedProps extends GridPaginationModel {}

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    onAddNewRecordClick: () => void
  }
}
