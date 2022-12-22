import { Params } from "react-router-dom";
import { UserLogin } from "../../../domain/usages/login";
import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemoteVerifyUser {
  constructor(
    private readonly url: string,
    private readonly HttpGet: HttpGetClient
  ) {}

  async verifyUser(): Promise<any> {
    const httpResponse = await this.HttpGet.get({
      url: this.url,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
