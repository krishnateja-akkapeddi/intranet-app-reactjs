import { HttpConstants } from "../http/http-constants";

export interface HttpCriteriasProgram {
  get: (params: HttpCriteriasProgram.Params) => Promise<any>;
}

export namespace HttpCriteriasProgram {
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