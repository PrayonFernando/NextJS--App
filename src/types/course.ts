export type CourseTag = {
  iconUrl?: string;
  text?: string;
};

export type Course = {
  // Normalized UI shape (derived from API)
  id: string;
  title: string; // from course_name
  subtitle: string; // from sub_title
  imageUrl: string; // from image_url (or local fallback)
  salePrice?: number; // from sale_price
  regularPrice?: number; // from regular_price
  category: string; // inferred from title (for tabs)
  tags: CourseTag[]; // normalized tags
};
