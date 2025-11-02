import { gql } from "@apollo/client";
import { getClient } from "@/apollo-client";
import { setLocalStorageToken } from "@/auth/localStorageToken";

export const LOGIN_BY_USERNAME = gql`
  mutation loginMutation($input: LoginByUserNameInput!) {
    loginByUserName(input: $input) {
      result {
        token
        success
        message
      }
    }
  }
`;

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const client = getClient();

  try {
    const { data } = await client.mutate<LoginResponse>({
      mutation: LOGIN_BY_USERNAME,
      variables: {
        input: {
          userName: username,
          password,
        },
      },
    });

    const result = data?.loginByUserName?.result;

    if (!result) {
      return {
        success: false,
        token: null,
        message: "No response from server",
      };
    }

    if (result.token) {
      setLocalStorageToken(result.token);
      return {
        success: true,
        token: result.token,
        message: result.message,
      };
    }

    return {
      success: false,
      token: null,
      message: result.message || "Unknown error",
    };
  } catch (err) {
    let message = "Network error";
    if (err instanceof Error) {
      message = err.message;
    }

    return {
      success: false,
      token: null,
      message,
    };
  }
}
