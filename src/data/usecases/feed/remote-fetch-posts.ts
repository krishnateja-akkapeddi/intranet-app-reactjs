import {
  FetchFeed,
  FetchFeedParams,
} from "./../../../domain/usages/fetch-posts";

import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemoteFetchFeed implements FetchFeed {
  constructor(
    private readonly url: string,
    private readonly HttpFetchPosts: HttpGetClient
  ) {}

  async fetchFeed(params: FetchFeedParams.params): Promise<any> {
    const httpResponse = await this.HttpFetchPosts.get({
      url: this.url,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.MULTIPART_FORM_DATA,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
