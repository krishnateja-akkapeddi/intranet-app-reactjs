export interface FetchFeed {
  fetchFeed(params: FetchFeedParams.params): Promise<any>;
}

export namespace FetchFeedParams {
  export type params = {
    lastToFirst?: boolean;
    category?: string;
    page: string;
    elementsLength: string;
  };
}
