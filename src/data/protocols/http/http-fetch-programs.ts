import { HttpConstants } from "../http/http-constants";

export interface HttpFetchPrograms {
  get: (params: HttpFetchPrograms.Params) => Promise<any>;
}

export namespace HttpFetchPrograms {
  export type Params = {
    url: string;
    query?: any;
    headers?: {
      [key: string]: string;
    };
    authHeaders?: boolean;
    responseType?: HttpConstants.RESPONSE_TYPES;
  };
}