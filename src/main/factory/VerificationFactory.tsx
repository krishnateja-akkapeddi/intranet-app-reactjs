import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_AUTH_HEADER, API_URL } from "../../base";
import { RemoteVerifyUser } from "../../data/usecases/auth/remote-auth-verification";
import { Private } from "../../domain/Constants";
import Endpoints from "../../domain/endpoints";
import { UserType } from "../../domain/models/userType";
import { AxiosHttpClient } from "../../infra/http/axios-http-client";
import { LocalJsonStorage } from "../../infra/http/local-json-storage";
import { appSlice } from "../../store/slices/AppSlice";

type Props = {
  children: React.ReactChild;
};

const VerificationFactory: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storage = LocalJsonStorage.getInstance();
  const authClient = AxiosHttpClient.getInstance();
  const remoteVerifyUser = new RemoteVerifyUser(
    `${API_URL}${Endpoints.VERIFY_USER}`,
    authClient
  );
  const subscribeUser = async () => {
    const token = storage?.get(Private.AUTH);
    if (!token) {
      navigate("/");
      return;
    }
    if (token) {
      authClient.setAuthHeaders({
        [API_AUTH_HEADER]: `Bearer ${token}`,
      });
      const data = await remoteVerifyUser.verifyUser();
      if (data.success) {
        const user: UserType = data.body;
        user.token = token;
        dispatch(appSlice.actions.storeUser(user));
        navigate("/feed");
        return;
      } else {
        navigate("/");
      }
    }
  };

  React.useEffect(() => {
    subscribeUser();
  }, []);
  return <div>{children}</div>;
};

export default VerificationFactory;
