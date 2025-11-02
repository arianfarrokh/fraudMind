import { GridPaginationModel } from "@mui/x-data-grid";

export interface MutationError {
  code: string;
  message: string;
}

export interface ResultData<T> {
  response: {
    result?: T | null;
    errors?: MutationError[] | null;
  };
}

export interface ResultById<T> {
  result: T;
}

export type SortType = "ASC" | "DESC";

export type QueryFilter = {
  contains?: string;
  ncontains?: string;
  startsWith?: string;
  nstartsWith?: string;
  endsWith?: string;
  eq?: string | number | boolean | Date;
  neq?: string | number | boolean | Date;
  gt?: number | Date;
  ngt?: number | Date;
  gte?: number | Date;
  ngte?: number | Date;
  lt?: number | Date;
  nlt?: number | Date;
  lte?: number | Date;
  nlte?: number | Date;
};

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}
export interface PaginationQuery {
  totalCount: number;
  pageInfo: PageInfo;
}
export interface AllPaginationQuery<QueryType> extends PaginationQuery {
  nodes?: QueryType[];
}

export interface PaginationVariable {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}
export interface AllRowQuery<QueryType> {
  result: AllPaginationQuery<QueryType>;
}
export interface AllRowQueryNoPaginate<QueryType> {
  result: QueryType[];
}

export type RefetchQueryModel<TVariable> = {
  variable: TVariable;
  paginationModel: GridPaginationModel;
};
const pageSize = 10;

export const initPageinationVariable: PaginationVariable = {
  before: null,
  after: null,
  first: null,
  last: null,
};
export const initPaginationModel = {
  page: 0,
  pageSize,
};

export interface IdVariable {
  id: number;
}
export interface InputIdVariable {
  input: {
    id: string | number;
  };
}
export interface InputVariable<TVariable> {
  input: TVariable;
}
