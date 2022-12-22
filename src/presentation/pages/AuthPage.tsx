import React from "react";
import { UserLogin } from "../../domain/usages/login";
import Login from "../Components/Auth/Login";

type Props = {
  remoteFetchUser: UserLogin;
};

const AuthPage = (props: Props) => {
  return (
    <div>
      <Login remoteFetchUser={props.remoteFetchUser} />
    </div>
  );
};

export default AuthPage;
