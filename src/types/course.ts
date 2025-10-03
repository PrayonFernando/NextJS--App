export type CourseTag = {
  iconUrl?: string;
  text?: string;
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  salePrice?: number;
  regularPrice?: number;
  category: string;
  tags: CourseTag[];
};
