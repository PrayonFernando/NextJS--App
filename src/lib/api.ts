import { Course } from "@/types/course";
import { LOCAL_IMAGES, DEFAULT_EXT } from "@/lib/local-images";

const API_URL =
  "https://66fcfeedc3a184a84d18a7f4.mockapi.io/imperial/api/v1/courses";

/** Optional local-by-id convention: /public/images/courses/<id>.<ext> */
function localById(id?: string | number, ext = DEFAULT_EXT) {
  if (id === undefined || id === null) return undefined;
  return `/images/courses/${id}.${ext}`;
}

/** Heuristic category mapping to drive the tabs (adjust as you like) */
function inferCategoryFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("prince2") || t.includes("project"))
    return "Project Management";
  if (
    t.includes("lean six") ||
    t.includes("six sigma") ||
    t.includes("business")
  )
    return "Business Management";
  if (t.includes("employability") || t.includes("career"))
    return "Employability Skills";
  if (t.includes("life")) return "Life Learning";
  return "All courses";
}

export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch(API_URL, { next: { revalidate: 60 } });
  if (!res.ok)
    throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText}`);

  const raw = (await res.json()) as Array<{
    id: string;
    course_name?: string;
    sub_title?: string;
    image_url?: string;
    sale_price?: number;
    regular_price?: number;
    createdAt?: string;
    tags?: Array<{ tag_image_url?: string; tag_text?: string }>;
  }>;

  return raw.map((c) => {
    const id = String(c.id ?? "");
    const title = c.course_name ?? "Untitled";
    const subtitle = c.sub_title ?? "";
    const mappedLocal = LOCAL_IMAGES[id]; // explicit mapping wins
    const byId = localById(id); // /images/courses/<id>.jpg
    const remote = c.image_url;
    const imageUrl = mappedLocal ?? byId ?? remote ?? "/placeholder.svg";

    const category = inferCategoryFromTitle(title);

    const tags = Array.isArray(c.tags)
      ? c.tags.slice(0, 4).map((t) => ({
          iconUrl: t.tag_image_url,
          text: t.tag_text,
        }))
      : [];

    return {
      id,
      title,
      subtitle,
      imageUrl,
      salePrice: c.sale_price,
      regularPrice: c.regular_price,
      category,
      tags,
    };
  });
}
