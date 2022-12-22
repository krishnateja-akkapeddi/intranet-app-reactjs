import { Params } from "react-router-dom";
import { UserLogin } from "../../../domain/usages/login";
import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemoteLogin implements UserLogin {
  constructor(
    private readonly url: string,
    private readonly HttpGetUser: HttpGetClient
  ) {}

  async login(params: Params): Promise<any> {
    const httpResponse = await this.HttpGetUser.get({
      url: this.url,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
