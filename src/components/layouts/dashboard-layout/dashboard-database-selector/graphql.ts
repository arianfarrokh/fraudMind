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
import { gql, TypedDocumentNode } from "@apollo/client"; // ابزارهای لازم از Apollo

// ---------- تعریف اینترفیس‌ها (نوع داده‌های TypeScript) ----------

// ترتیب (Order) برای کوئری گرفتن لیست Schemaها
export interface AllSchemasOrder {
  name?: string; // مثلاً براساس name مرتب‌سازی شود
}

// فیلتر برای جستجو در بین Schemaها
export interface AllSchemasFilter {
  name?: QueryFilter; // فیلتر بر اساس name
}

// متغیرهای ورودی کوئری لیست Schemaها با پشتیبانی از pagination
export interface AllSchemasVariables extends PaginationVariable {
  order?: AllSchemasOrder[]; // ترتیب مرتب‌سازی
  where?: { and?: AllSchemasFilter[] } | { or?: AllSchemasFilter[] } | null; // فیلتر AND یا OR
}

// ---------- تعریف Query برای دریافت لیست Schema با pagination ----------
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

// ---------- تعریف Query بدون pagination برای دریافت همه Schemaها ----------
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

// ---------- دریافت یک Schema بر اساس شناسه ----------
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

// ---------- میوتیشن (Mutation) برای افزودن Schema جدید ----------
export interface AddNewSchemaVariable {
  id?: number;
  name: string;
  description?: string;
}

export const addNewSchemaMutation: TypedDocumentNode<
  ResultData<number>,
  InputVariable<AddNewSchemaVariable>
> = gql`
  mutation addNewSchemaMutation($input: SchemaInput!) {
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

// ---------- میوتیشن برای ویرایش Schema ----------
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

// ---------- میوتیشن برای حذف Schema ----------
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
