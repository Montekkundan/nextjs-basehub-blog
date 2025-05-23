import { Link } from "@/components/link"
import { RichText } from "@/components/rich-text"

import { QueryType } from "./query"

export const Capabilities = ({ data }: { data: QueryType }) => {
  const capabilities = data.pages.homepage.capabilities
  const categories = data.me.projects.projectCategories.items

  return (
    <div className="grid-layout">
      <h3 className="col-span-full mb-2 text-f-h3-mobile text-brand-g1 lg:col-start-2 lg:text-f-h3 2xl:col-start-3">
        {capabilities._title}
      </h3>

      <div className="col-span-full text-brand-w2 [&_p]:text-f-h1-mobile lg:[&_p]:text-f-h1">
        <RichText>{capabilities.intro?.json?.content}</RichText>
      </div>

      <div className="grid-layout relative col-span-full mt-16 !px-0">
        <div className="col-start-1 col-end-11 grid grid-cols-2 gap-x-3 gap-y-8 lg:col-start-2 lg:grid-cols-8 2xl:col-start-3">
          {categories.map((c) => (
            <div
              key={c._title}
              className="col-span-1 mt-1.25 flex flex-col gap-y-6 text-brand-w1 lg:col-span-2"
            >
              <h4 className="text-f-h4-mobile lg:text-f-h4">
                  <span  >{c._title}</span>
              </h4>

              <p className="-mt-1 text-f-h4-mobile text-brand-w2 lg:text-f-h4">
                {c.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {c.subCategories.items.map((s) => (
                  <p
                    key={s._title}
                    title={s._title}
                    className="line-clamp-1 w-fit bg-brand-g2 px-1 text-f-p-mobile text-brand-w1 lg:text-f-p"
                  >
                    {s._title}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}