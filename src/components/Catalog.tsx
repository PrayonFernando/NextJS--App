"use client";

import { useMemo, useState } from "react";
import { Course } from "@/types/course";
import dynamic from "next/dynamic";

const CourseCard = dynamic(() => import("./CourseCard"), {
  ssr: true,
  loading: () => (
    <div className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
  ),
});

type Props = { courses: Course[] };

const PREFERRED_ORDER = [
  "All courses",
  "Project Management",
  "Business Management",
  "Employability Skills",
  "Life Learning",
];

export default function Catalog({ courses }: Props) {
  const { categories, byCat, counts } = useMemo(() => {
    const map: Record<string, Course[]> = {};
    for (const c of courses) {
      const cat = c.category || "All courses";
      (map[cat] ||= []).push(c);
    }
    const uniq = Object.keys(map);
    const ordered = [
      ...PREFERRED_ORDER.filter((k) => k !== "All courses" && uniq.includes(k)),
      ...uniq.filter((k) => !PREFERRED_ORDER.includes(k)).sort(),
    ];
    const withAll = ["All courses", ...ordered];
    const counts: Record<string, number> = Object.fromEntries(
      withAll.map((k) => [
        k,
        k === "All courses" ? courses.length : map[k]?.length ?? 0,
      ])
    );
    return { categories: withAll, byCat: map, counts };
  }, [courses]);

  const [active, setActive] = useState<string>(categories[0] ?? "All courses");
  const [visible, setVisible] = useState<number>(6);

  const filtered = active === "All courses" ? courses : byCat[active] ?? [];
  const show = filtered.slice(0, visible);
  const canShowMore = visible < filtered.length;

  return (
    <>
      {/* Tabs */}
      <div className="container pt-6">
        <div className="flex items-center justify-center">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-2">
            {categories.map((cat) => {
              const activeStyle =
                active === cat
                  ? "btn btn-pill btn-solid"
                  : "btn btn-pill btn-outline";
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat);
                    setVisible(6);
                  }}
                  className={`${activeStyle} whitespace-nowrap`}
                  aria-pressed={active === cat}
                >
                  {cat}
                  <span className="chip">{counts[cat] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-8 md:py-10">
        <div className="container">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {show.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {canShowMore && (
              <button
                className="btn btn-outline btn-pill"
                onClick={() => setVisible((v) => v + 6)}
              >
                Show more
              </button>
            )}
            {filtered.length > 6 && (
              <button
                className="btn btn-outline btn-pill"
                onClick={() => setVisible(filtered.length)}
              >
                View all
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
