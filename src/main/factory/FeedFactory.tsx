import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_AUTH_HEADER, API_URL } from "../../base";
import { RemoteFetchCategories } from "../../data/usecases/category/remote-fetch-categories";
import { RemoteFetchFeed } from "../../data/usecases/feed/remote-fetch-posts";
import { RemotePublishPost } from "../../data/usecases/feed/remote-publish-post";
import { Private } from "../../domain/Constants";
import Endpoints from "../../domain/endpoints";
import { UserType } from "../../domain/models/userType";
import { AxiosHttpClient } from "../../infra/http/axios-http-client";
import { LocalJsonStorage } from "../../infra/http/local-json-storage";
import NavBar from "../../Layouts/NavBar";
import FeedPage from "../../presentation/pages/FeedPage";
import pageRoutes from "../../routes/pageRoutes";
import AppSlice, { appSlice } from "../../store/slices/AppSlice";
import VerificationFactory from "./VerificationFactory";

type Props = {};

const FeedFactory = (props: Props) => {
  const storage = LocalJsonStorage.getInstance();
  const user: UserType = storage?.get(Private.USERINFO);
  const navigate = useNavigate();

  const token = storage?.get(Private.AUTH);
  const dispatch = useDispatch();
  if (token) {
    user["token"] = token;
    dispatch(appSlice.actions.storeUser(user));
  }

  if (!token) {
    navigate("/");
  }

  const feedServiceClient = AxiosHttpClient.getInstance();
  feedServiceClient.setAuthHeaders({
    [API_AUTH_HEADER]: `Bearer ${token}`,
  });
  const remotePublishPost = new RemotePublishPost(
    `${API_URL}${Endpoints.PUBLISH_POST}`,
    feedServiceClient
  );
  const remoteFetchPosts = new RemoteFetchFeed(
    `${API_URL}${Endpoints.FETCH_POSTS}`,
    feedServiceClient
  );
  const remoteFetchCategories = new RemoteFetchCategories(
    `${API_URL}${Endpoints.FETCH_CATEGORIES}`,
    feedServiceClient
  );
  React.useEffect(() => {
    if (!storage.get(Private.USERINFO) || !storage.get(Private.AUTH)) {
      navigate(pageRoutes[0].path);
    } else {
    }
  }, [localStorage, token]);

  return (
    <VerificationFactory>
      <div>
        <NavBar userInfo={user} />
        <FeedPage
          fetchPosts={remoteFetchPosts}
          publishPost={remotePublishPost}
          fetchCategories={remoteFetchCategories}
        />
      </div>
    </VerificationFactory>
  );
};

export default FeedFactory;
