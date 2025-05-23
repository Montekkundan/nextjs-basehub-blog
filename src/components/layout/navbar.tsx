import { Pump } from "basehub/react-pump"

import { NavbarContent } from "./navbar-content"
import { query } from "./query"

interface NavbarLink {
  title: string
  href: string
  count?: number
}

export const Navbar = () => (
  <Pump queries={[query]}>
    {async ([data]) => {
      "use server"

      const posts = data.pages.blog.posts.items.length

      const LINKS: NavbarLink[] = [
        {
          title: "Home",
          href: "/"
        },
        {
          title: "Blog",
          href: "/blog",
          count: posts
        },
        {
          title: "Lab",
          href: "https://lab.montek.dev"
        }
      ]

      return (
        <NavbarContent
          key="navbar-content"
          links={LINKS}
          socialLinks={{
            twitter: data.me.social.twitter || "",
            instagram: data.me.social.instagram || "",
            github: data.me.social.github || "",
            linkedIn: data.me.social.linkedIn || ""
          }}
        />
      )
    }}
  </Pump>
)