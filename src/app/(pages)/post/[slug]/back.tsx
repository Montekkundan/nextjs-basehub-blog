import Link from "next/link"

import { Arrow } from "@/components/icons"

export const Back = () => (
  <Link
    href="/blog"
    className="  text-f-p-mobile text-brand-w1 lg:!sticky lg:top-13 lg:text-f-p"
  >
    <span className="  inline-flex items-center gap-1">
      <Arrow className="size-4 rotate-180" /> Blog
    </span>
  </Link>
)