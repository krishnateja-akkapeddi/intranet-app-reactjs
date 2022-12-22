import {
  PublishPost,
  PublishPostParams,
} from "../../../domain/usages/publishPost";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { HttpConstants } from "../../protocols/http/http-constants";

export class RemotePublishPost implements PublishPost {
  constructor(
    private readonly url: string,
    private readonly HttpPublishPost: HttpPostClient
  ) {}

  async publish(params: FormData): Promise<any> {
    const httpResponse = await this.HttpPublishPost.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.MULTIPART_FORM_DATA,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
