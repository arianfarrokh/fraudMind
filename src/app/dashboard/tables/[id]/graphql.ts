import { ResultData } from "@/graphql/query-types";
import { gql, TypedDocumentNode } from "@apollo/client";

export const uploadDataMutation: TypedDocumentNode<
  ResultData<{ path: string }>,
  UploadCsvVariable
> = gql`
  mutation uploadDataMutation($input: UploadInput!) {
    uploadFile(input: $input) {
      result {
        effectedRows
        __typename
      }
    }
  }
`;
