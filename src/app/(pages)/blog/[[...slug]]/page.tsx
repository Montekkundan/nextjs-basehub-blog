import { fetchCategoriesNonEmpty } from "../basehub"
import { BlogList } from "../list"

type Params = Promise<{slug: string[]}>

export const experimental_ppr = true

const BlogIndexPage = async (props: { params: Params }) => {
  const params = await props.params

  return <BlogList params={params} />
}


export default BlogIndexPage