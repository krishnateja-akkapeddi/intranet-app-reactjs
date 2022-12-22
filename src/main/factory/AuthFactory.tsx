import React, { useEffect } from "react";
import { API_URL, AUTH_CLIENT } from "../../base";
import { RemoteLogin } from "../../data/usecases/auth/remote-login";
import Endpoints from "../../domain/endpoints";
import { AxiosHttpClient } from "../../infra/http/axios-http-client";
import AuthPage from "../../presentation/pages/AuthPage";
import { gapi } from "gapi-script";
import VerificationFactory from "./VerificationFactory";
gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: AUTH_CLIENT,
    plugin_name: "chat",
  });
});

type Props = {};

const authServiceAxiosHttpClient = AxiosHttpClient.getInstance();
const remoteFetchUser = new RemoteLogin(
  `${API_URL}${Endpoints.LOGIN_USER}`,
  authServiceAxiosHttpClient
);

const AuthFactory = (props: Props) => {
  return (
    
    <VerificationFactory>
      <div>
        <AuthPage remoteFetchUser={remoteFetchUser} />
      </div>
    </VerificationFactory>
  );
};

export default AuthFactory;
