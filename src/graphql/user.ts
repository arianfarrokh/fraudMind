import { TypedDocumentNode, gql } from '@apollo/client'
import { ResultData } from './query-types'

interface loginResponse {
  id: string
  success: boolean
  message: string
  token: string
}

export interface LoginByUserNameVariable {
  input: {
    userName: string
    password: string
  }
}

export const loginByUserNameMutation: TypedDocumentNode<
  ResultData<loginResponse>,
  LoginByUserNameVariable
> = gql`
  mutation loginByUserName($input: LoginByUserNameRequestInput!) {
    response: loginByUserName(input: { loginRequest: $input }) {
      result: loginResponse {
        id
        success
        message
        token
      }
      errors {
        code: __typename
        ... on Error {
          message
        }
      }
    }
  }
`
