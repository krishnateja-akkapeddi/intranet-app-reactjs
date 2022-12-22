export interface feedResult {
  success: boolean;
  paginationDetails: PaginationDetails;
  body: FeedPosts[];
}

export interface PaginationDetails {
  elementsPerPage: number;
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

export interface FeedPosts {
  userBasicDetails: UserBasicDetails;
  category: Category;
  postId: number;
  postName: string;
  description: string;
  url: string;
  createdDate: any;
}

export interface UserBasicDetails {
  userId: number;
  name: string;
  profilePic: string;
  role: Role;
}

export interface Role {
  role: string;
  roleId: number;
}

export interface Category {
  category: string;
  categoryId: number;
}
