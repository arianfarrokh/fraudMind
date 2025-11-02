import {
  AllRowQuery,
  AllRowQueryNoPaginate,
  IdVariable,
  InputIdVariable,
  InputVariable,
  PaginationVariable,
  QueryFilter,
  ResultById,
  ResultData,
} from "@/graphql/query-types";
import { gql, TypedDocumentNode } from "@apollo/client";

export interface AllSchemasOrder {
  name?: string;
}

export interface AllSchemasFilter {
  name?: QueryFilter;
}

export interface AllSchemasVariables extends PaginationVariable {
  order?: AllSchemasOrder[];
  where?: { and?: AllSchemasFilter[] } | { or?: AllSchemasFilter[] } | null;
}

export const allSchemasQuery: TypedDocumentNode<
  AllRowQuery<{ id: number; name: string; description: string }>,
  AllSchemasVariables
> = gql`
  query allSchemasQuery(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $order: [FraudMindSchemaDTOSortInput!]
    $where: FraudMindSchemaDTOFilterInput
  ) {
    result: allSchemas(
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
      }
    }
  }
`;

export interface AllSchemasNoPagedVariable {
  name?: string;
}

export const allSchemasNoPagedQuery: TypedDocumentNode<
  AllRowQueryNoPaginate<{ id: number; name: string }>,
  AllSchemasNoPagedVariable
> = gql`
  query allSchemasNoPagedQuery {
    result: allSchemasNoPage {
      name
      id
    }
  }
`;

export const schemaByIdQuery: TypedDocumentNode<
  ResultById<{ id: number; name: string }>,
  IdVariable
> = gql`
  query schemaByIdQuery($id: Int!) {
    result: schemaById(id: $id) {
      id
      name
    }
  }
`;

export interface AddNewSchemaVariable {
  name: string;
  description?: string;
}

export const addNewSchemaMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<AddNewSchemaVariable>
> = gql`
  mutation addNewSchemaMutation($input: CreateNewSchemaInput!) {
    response: createSchema(input: $input) {
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

export interface UpdateSchemaVariable {
  id: number;
  name: string;
  description: string;
}

export const updateSchemaMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<UpdateSchemaVariable>
> = gql`
  mutation updateSchemaMutation($input: UpdateSchemaInput!) {
    response: updateSchema(input: $input) {
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

export const deleteSchemaMutation: TypedDocumentNode<
  ResultData<number>,
  InputIdVariable
> = gql`
  mutation deleteSchemaMutation($input: DeleteSchemaInput!) {
    response: deleteSchema(input: $input) {
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
