type LoginResponse = {
  loginByUserName: {
    result: {
      token: string;
      success: boolean;
      message: string;
    };
  };
};
