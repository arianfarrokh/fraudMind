import {
  GridFilterInputSingleSelect,
  GridFilterOperator,
} from "@mui/x-data-grid";

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const singleSelectOperators: GridFilterOperator<any, number>[] = [
  {
    value: "eq",
    label: "برابر با",
    InputComponent: GridFilterInputSingleSelect,
    getApplyFilterFn: () => null,
  },
  {
    value: "neq",
    label: "مخالف با",
    InputComponent: GridFilterInputSingleSelect,
    getApplyFilterFn: () => null,
  },
];
export default singleSelectOperators