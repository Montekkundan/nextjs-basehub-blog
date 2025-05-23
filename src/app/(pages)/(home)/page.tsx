import type { Metadata } from "next"


import { fetchHomepage } from "./basehub"
// import { Capabilities } from "./capabilities"
import { Intro } from "./intro"
import { FeaturedBlogs } from "./featured-blogs"
import { Contact } from "./contact"
import { Capabilities } from "./capabilities"

export const metadata: Metadata = {
  title: {
    absolute: "Montek"
  },
  description:
    "Montek is a developer"
}

const Homepage = async () => {
  const data = await fetchHomepage()

  return (
    <div className="flex flex-col gap-18 lg:gap-32">
      <Intro data={data} />
      <FeaturedBlogs data={data} />
      <Capabilities data={data} />
      <Contact />
    </div>
  )
}

export default Homepage