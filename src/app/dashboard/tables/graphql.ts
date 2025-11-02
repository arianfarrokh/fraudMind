import { gql, TypedDocumentNode } from "@apollo/client";
import {
  AllRowQuery,
  AllRowQueryNoPaginate,
  InputIdVariable,
  InputVariable,
  PaginationVariable,
  QueryFilter,
  ResultById,
  ResultData,
} from "@/graphql/query-types";

// ---------- Table Types ----------

// ---------- Query Order and Filter ----------
export interface AllTablesOrder {
  name?: string;
}

export interface AllTablesFilter {
  name?: QueryFilter;
  description?: QueryFilter;
  schemaId?: QueryFilter;
}

export interface AllTablesVariables extends PaginationVariable {
  order?: AllTablesOrder[];
  where?: { and?: AllTablesFilter[]; or?: AllTablesFilter[] } | null;
}

// ---------- Queries ----------
export const allTablesQuery: TypedDocumentNode<
  AllRowQuery<FraudMindTableType>,
  AllTablesVariables
> = gql`
  query allTablesQuery(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $order: [FraudMindTableDTOSortInput!]
    $where: FraudMindTableDTOFilterInput
  ) {
    result: allTables(
      first: $first
      last: $last
      before: $before
      after: $after
      order: $order
      where: $where
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        name
        description
        fraudMindColumns {
          id
          name
          title
          description
          columnType
          isNullable
          isUnique
        }
      }
    }
  }
`;

export const addNewColumnMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<AddNewColumnsVariable>
> = gql`
  mutation addNewColumnMutation($input: ColumnInput!) {
    response: createColumn(input: $input) {
      result {
        id
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;
export const addNewTableMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<AddNewTableVariable>
> = gql`
  mutation addNewTableMutation($input: TableInput!) {
    response: createTable(input: $input) {
      result {
        id
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;

export const deleteTableMutation: TypedDocumentNode<
  ResultData<number>,
  InputIdVariable
> = gql`
  mutation deleteMutation($input: DeleteTableInput!) {
    deleteTable(input: $input) {
      result {
        id
      }
    }
  }
`;
export const deleteColumnMutation: TypedDocumentNode<
  ResultData<number>,
  InputIdVariable
> = gql`
  mutation deleteColumnMutation($input: DeleteColumnInput!) {
    response: deleteColumn(input: $input) {
      result {
        id
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;
