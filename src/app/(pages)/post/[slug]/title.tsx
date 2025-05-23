import { QueryType } from "./query"

function findBlogTitle(data: QueryType, slug: string): string {
  const post = data.pages.blog.posts.items.find((post) => post._slug === slug)
  return post?._title || "Blog"
}

interface BlogTitleProps {
  data: QueryType
  slug: string
}

export const BlogTitle = ({ data, slug }: BlogTitleProps) => {
  const title = findBlogTitle(data, slug)

  return (
    <section className="grid-layout text-f-h1-mobile lg:text-f-h1">
      <h1 className="col-span-full text-brand-w1 lg:col-start-1 lg:col-end-11">
        {title}
      </h1>
    </section>
  )
}