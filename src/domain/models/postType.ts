import { URL } from "url";

export interface PostType {
  postTitle: string;
  postDescription: string;
  postImage?: string;
  postAudience?: Audience[];
}

export interface Audience {
  role: string;
  roleId: string;
}
