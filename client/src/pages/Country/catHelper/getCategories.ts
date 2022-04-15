import { categories } from "../../../constants/categories/category_id";

export const getCategories = (country: string) =>
  categories[country].map((category) => ({
    id: category.snippet.id,
    title: category.snippet.title,
  }));

