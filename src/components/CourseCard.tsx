"use client";

import { memo } from "react";
import Image from "next/image";
import { Course } from "@/types/course";
import SafeImage from "@/components/SafeImage";

type Props = { course: Course };

const formatGBP = (n: number) =>
  `£${n.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`;

function CourseCardBase({ course }: Props) {
  const { title, subtitle, imageUrl, salePrice, regularPrice, tags } = course;

  const hasDiscount =
    typeof salePrice === "number" &&
    typeof regularPrice === "number" &&
    salePrice < regularPrice;

  return (
    <article
      className="
        card card-border overflow-hidden
        transition will-change-transform
        hover:shadow-md hover:-translate-y-0.5
      "
    >
      <div className="p-3 sm:p-4">
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden ring-1 ring-slate-200/60">
          <SafeImage
            src={imageUrl || "/placeholder.svg"}
            alt={title || "Course"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
            priority={false}
            fallbackSrc="/placeholder.svg"
          />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-heading text-base md:text-lg font-semibold leading-snug line-clamp-2">
          {title}
        </h3>

        {tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((t, i) => (
              <span key={i} className="chip inline-flex items-center gap-1">
                {t.iconUrl ? (
                  <Image
                    src={t.iconUrl}
                    alt={t.text ?? "tag"}
                    width={14}
                    height={14}
                    className="rounded"
                  />
                ) : null}
                {t.text}
              </span>
            ))}
          </div>
        ) : null}

        {subtitle ? (
          <p className="text-sm text-slate-600 line-clamp-2">{subtitle}</p>
        ) : null}

        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {typeof salePrice === "number" ? (
              <span className="text-lg md:text-xl font-bold">
                {formatGBP(salePrice)}
              </span>
            ) : null}
            {hasDiscount ? (
              <span className="text-sm text-slate-500 line-through">
                {formatGBP(regularPrice!)}
              </span>
            ) : null}{" "}
            in full
          </div>

          <button className="btn  btn-pill" aria-label="View details">
            View details →
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(CourseCardBase);
