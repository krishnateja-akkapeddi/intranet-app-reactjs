export interface PublishPost {
  publish(params: FormData): Promise<any>;
}

export namespace PublishPostParams {
  export type params = {
    postTitle: string;
    postDescription: string;
    postImage: File;
    user: number;
    category: number | undefined;
  };
}
