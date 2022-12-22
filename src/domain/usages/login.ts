export interface UserLogin {
  login(params: UserLoginParams.params): Promise<any>;
}

export namespace UserLoginParams {
  export type params = {
    authId: string;
  };
}
