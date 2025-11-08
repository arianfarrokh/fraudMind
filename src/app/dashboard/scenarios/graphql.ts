import {
  AllRowQuery,
  InputIdVariable,
  InputVariable,
  PaginationVariable,
  QueryFilter,
  ResultById,
  ResultData,
} from "@/graphql/query-types";
import { gql, TypedDocumentNode } from "@apollo/client";

// ---------- Table Types ----------

// ---------- Query Order and Filter ----------
export interface AllScenariosOrder {
  name?: string;
}

export interface AllScenariosFilter {
  name?: QueryFilter;
  description?: QueryFilter;
  fraudMindSchemaId?: QueryFilter;
}

export interface AllScenariosVariables extends PaginationVariable {
  order?: AllScenariosOrder[];
  where?: { and?: AllScenariosFilter[]; or?: AllScenariosFilter[] } | null;
}

// ---------- Queries ----------
export const AllScenariosQuery: TypedDocumentNode<
  AllRowQuery<ScenarioType>,
  AllScenariosVariables
> = gql`
  query allScenariosQuery(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $order: [ScenarioDTOSortInput!]
    $where: ScenarioDTOFilterInput
  ) {
    result: allScenarios(
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
        name
        description
        sqlText
        fraudMindSchemaId
        id
        fraudMindSchema {
          name
          id
          description
          createdDate
        }
      }
    }
  }
`;

export const addNewScenarioMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<ScenarioInputVariable>
> = gql`
  mutation addNewScenarioMutation($input: ScenarioInput!) {
    response: createScenario(input: $input) {
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

export const updateScenarioMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<ScenarioInputVariable>
> = gql`
  mutation updateScenarioMutation($input: ScenarioInput!) {
    response: updateScenario(input: $input) {
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

export const deleteScenarioMutation: TypedDocumentNode<
  ResultData<number>,
  InputIdVariable
> = gql`
  mutation deleteScenarioMutation($input: DeleteScenarioInput!) {
    response: deleteScenario(input: $input) {
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

export const executeScenarioQuery: TypedDocumentNode<
  ResultById<ExecuteScenarioResult>,
  ExecuteScenarioVariable
> = gql`
  query executeScenarioQuery($scenarioId: Int!) {
    result: executeScenario(scenarioId: $scenarioId) {
      columns
      jsonData
      error
    }
  }
`;
