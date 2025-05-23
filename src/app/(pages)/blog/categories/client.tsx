"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

interface CategoriesClientProps {
  categories: { _title: string; _slug: string }[]
}

export const CategoriesClient = ({ categories }: CategoriesClientProps) => {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract the category slug from URL path more reliably
  const pathSegments = pathname.split("/")
  const activeCategory = pathSegments.length > 2 ? pathSegments[2] : ""

  return (
    <div className="col-span-full row-start-1 flex flex-col gap-1 pb-8 lg:col-span-3 lg:col-start-9 lg:row-start-auto lg:gap-2">
      <p className="text-f-p-mobile text-brand-g1 lg:text-f-h3">Categories</p>

      <ul className="flex flex-col gap-y-1 lg:flex-row lg:flex-wrap lg:gap-x-4">
        {categories.map((category) => {
          const isActive = activeCategory === category._slug
          const isHomeActive = !activeCategory && category._slug === ""
          
          const href = category._slug === "" ? "/blog" : `/blog/${category._slug}`

          return (
            <Link
              href={href}
              onClick={(e) => {
                e.preventDefault()
                if (isActive) {
                  router.push("/blog", { scroll: false })
                } else {
                  router.push(href, { scroll: false })
                }
              }}
              prefetch
              key={category._title}
              className={cn(
                "flex w-max gap-x-1.25 text-left !text-f-h2-mobile transition-colors duration-300 lg:!text-f-h2",
                isActive || isHomeActive
                  ? "text-brand-w1"
                  : "text-brand-g1"
              )}
            >
              <span  >{category._title}</span>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}