"use client";

import { Course } from "@/types/course";
import dynamic from "next/dynamic";

const CourseCard = dynamic(() => import("./CourseCard"), {
  ssr: true,
  loading: () => (
    <div className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
  ),
});

type Props = {
  title: string;
  courses: Course[];
};

export default function CategorySection({ title, courses }: Props) {
  return (
    <section className="py-8 md:py-10">
      <div className="container">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        </div>

        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
