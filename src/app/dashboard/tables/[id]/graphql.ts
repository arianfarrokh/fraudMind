import { InputIdVariable, ResultData } from "@/graphql/query-types";
import { gql, TypedDocumentNode } from "@apollo/client";

export const uploadDataMutation: TypedDocumentNode<
  ResultData<{ path: string }>,
  UploadCsvVariable
> = gql`
  mutation uploadDataMutation($input: UploadCsvInput!) {
    uploadCsv(input: $input) {
      result {
        path
        __typename
      }
    }
  }
`;
