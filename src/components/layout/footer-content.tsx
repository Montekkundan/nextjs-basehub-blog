import type { QueryType } from "./query"
import { InternalLinks, SocialLinks } from "./shared-sections"

export const FooterContent = ({ data }: { data: QueryType }) => {
  const posts = data.pages.blog.posts.items.length

  const LINKS = [
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
      href: "https://lab.montek.dev",
    }
  ]

  return (
    <footer className="relative z-10 flex flex-col justify-between bg-brand-k pb-4 ">

      <div className="grid-layout relative grid-rows-[auto_auto_28px] !gap-y-10 pb-2 pt-4 lg:grid-rows-[auto] lg:items-end lg:!gap-y-2 lg:py-0">
        <InternalLinks
          className="col-start-1 col-end-5 row-start-1 border-b border-brand-w1/30 pb-4 lg:col-start-1 lg:col-end-5 lg:border-none lg:pb-0"
          links={LINKS}
          onNav={false}
        />

        <div className="col-span-full row-start-3 flex flex-col justify-end gap-y-2 lg:hidden">
          <SocialLinks
            className="col-start-1 col-end-5 row-start-2 lg:hidden"
            links={{
              twitter: data.me.social.twitter || "",
              instagram: data.me.social.instagram || "",
              github: data.me.social.github || "",
              linkedIn: data.me.social.linkedIn || ""
            }}
          />
          {/* <BasehubButtonMobile className="text-left" /> */}
          <div className="flex justify-between gap-y-2">
            {/* <Mentions />
            <Copyright /> */}
          </div>
        </div>

        <div className="col-start-10 col-end-13 hidden translate-y-[3px] flex-col items-end gap-y-2 lg:flex">
          <SocialLinks
            links={{
              twitter: data.me.social.twitter || "",
              instagram: data.me.social.instagram || "",
              github: data.me.social.github || "",
              linkedIn: data.me.social.linkedIn || ""
            }}
          />
          {/* <Copyright />
          <Mentions />
          <BasehubButton /> */}
        </div>
      </div>
    </footer>
  )
}