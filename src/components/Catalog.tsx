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

const FIGMA_CATEGORIES: string[] = [
  "All courses",
  "Project Management",
  "Business Management",
  "Employability Skills",
  "Life Learning",
  "Cyber Security",
  "Software Development",
  "Data Science & AI",
  "Cloud & DevOps",
];

const VISIBLE_COUNT = 5;

export default function Catalog({ courses }: Props) {
  const dataMap = useMemo(() => {
    const m: Record<string, Course[]> = {};
    for (const c of courses) {
      const cat = c.category || "All courses";
      (m[cat] ||= []).push(c);
    }
    return m;
  }, [courses]);

  const tabs = useMemo(() => {
    const extras = Object.keys(dataMap).filter(
      (k) => !FIGMA_CATEGORIES.includes(k)
    );
    return [...FIGMA_CATEGORIES, ...extras];
  }, [dataMap]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const t of tabs) {
      c[t] = t === "All courses" ? courses.length : dataMap[t]?.length ?? 0;
    }
    return c;
  }, [tabs, courses.length, dataMap]);

  const [active, setActive] = useState<string>(tabs[0] ?? "All courses");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [visible, setVisible] = useState<number>(6); // cards per page

  const visibleTabs = useMemo(() => {
    if (expanded) return tabs;
    const base = tabs.slice(0, VISIBLE_COUNT);
    if (!base.includes(active)) {
      if (base.length > 0) {
        const clone = base.slice(0, VISIBLE_COUNT - 1);
        clone.push(active);
        return clone;
      }
    }
    return base;
  }, [tabs, expanded, active]);

  const showExpandControl = tabs.length > VISIBLE_COUNT;

  const filtered = active === "All courses" ? courses : dataMap[active] ?? [];
  const list = filtered.slice(0, visible);
  const canShowMore = visible < filtered.length;

  return (
    <>
      <div className="container pt-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 py-2">
            {/* Visible tabs */}
            {visibleTabs.map((cat) => {
              const isActive = active === cat;
              const classes = isActive
                ? "btn btn-pill btn-green"
                : "btn btn-pill btn-bg";
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat);
                    setVisible(6);
                  }}
                  className={`${classes} whitespace-nowrap`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}

            {showExpandControl && (
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="btn btn-pill btn-solid w-9 h-9 p-0 grid place-content-center"
                aria-expanded={expanded}
                aria-label={
                  expanded ? "Show fewer categories" : "Show more categories"
                }
                title={expanded ? "Collapse categories" : "Expand categories"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className={`transition-transform duration-200 ${
                    expanded ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {expanded && tabs.length > visibleTabs.length && (
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {tabs
              .filter((t) => !visibleTabs.includes(t))
              .map((cat) => {
                const isActive = active === cat;
                const classes = isActive
                  ? "btn btn-pill btn-green"
                  : "btn btn-pill btn-outline";
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActive(cat);
                      setVisible(6);
                    }}
                    className={`${classes} whitespace-nowrap`}
                    aria-pressed={isActive}
                  >
                    {cat}
                  </button>
                );
              })}
          </div>
        )}
      </div>

      <section className="py-8 md:py-10">
        <div className="container">
          {list.length > 0 ? (
            <>
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>

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
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-slate-100" />
              <h3 className="text-lg font-semibold">
                No courses in this category yet
              </h3>
              <p className="text-slate-600 mt-1">
                Please check back soon or explore other categories.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
