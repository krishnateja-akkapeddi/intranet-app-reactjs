import { FetchCategories } from "./../../../domain/usages/fetch-categories";
import {
  FetchFeed,
  FetchFeedParams,
} from "./../../../domain/usages/fetch-posts";

import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemoteFetchCategories implements FetchCategories {
  constructor(
    private readonly url: string,
    private readonly HttpFetchPCategories: HttpGetClient
  ) {}

  async fetchCategories(params: FetchFeedParams.params): Promise<any> {
    const httpResponse = await this.HttpFetchPCategories.get({
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
