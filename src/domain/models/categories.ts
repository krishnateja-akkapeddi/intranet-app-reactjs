export interface CategoriesType {
  success: boolean;
  body?: SingleCategoryType[] | null;
}
export interface SingleCategoryType {
  categoryId: number;
  category: string;
  createdDate: string;
  updatedDate: string;
}
