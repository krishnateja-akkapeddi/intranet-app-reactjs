import { HttpConstants } from "../http/http-constants";

export interface HttpChangeEnrollment {
  get: (params: HttpChangeEnrollment.Params) => Promise<any>;
}

export namespace HttpChangeEnrollment {
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