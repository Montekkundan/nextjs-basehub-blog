import { Categories } from "./categories"
import { Featured } from "./featured"
import { Hero } from "./hero"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div id="list" className="-translate-y-[3.25rem]" />
      <div className="pb-25 relative flex flex-col gap-12 bg-brand-k lg:gap-20">
        <Hero />
        <Featured />
        <section className="grid-layout pb-[35px] lg:pt-12" id="list">
          <div className="col-span-full -mb-3 grid grid-cols-12 border-brand-w1/20 lg:border-b lg:pb-2">
            <h2 className="col-span-full mt-auto text-f-h3-mobile text-brand-g1 lg:col-span-3 lg:col-start-5 lg:text-f-h3">
              More Blogs
            </h2>
            <Categories />
          </div>
          {children}
        </section>
      </div>
    </>
  )
}