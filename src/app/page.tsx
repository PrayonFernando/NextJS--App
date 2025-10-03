import { fetchCourses } from "@/lib/api";
import Catalog from "@/components/Catalog";

export default async function HomePage() {
  const courses = await fetchCourses();

  return (
    <>
      {/* Hero / Heading to match the screenshot copy */}
      <header className="border-b border-black/5">
        <div className="container py-8 md:py-12 text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Master Your Career Growth with Our Top-Rated,
            <br className="hidden md:block" />
            Expert-Led Courses
          </h1>
        </div>
      </header>

      {/* Tabs + Grid + Actions */}
      <Catalog courses={courses} />
    </>
  );
}
