import { Language } from "basehub/react-code-block"
import { HandlerProps, RichTextProps } from "basehub/react-rich-text"
import Image from "next/image"

import { Link } from "@/components/link"
import { RichText } from "@/components/rich-text"

import { BaseCodeBlock } from "./components/code-block"
import { CodeGroupBottom, CodeGroupHeader, StandaloneCopyButton } from "./components/code-block-header"

export const BlogImage = ({ src, alt, width, height, bg }: HandlerProps<"img"> & { bg?: string }) => {
  if (!src) return null

  return (
    <div
      className={`image relative aspect-video w-full overflow-hidden after:absolute after:inset-0 after:border after:border-brand-w1/20 ${bg ? `bg-${bg}` : ''}`}
      style={{ aspectRatio: width ? `${width}/${height}` : "16/9" }}
    >
      <div className="with-dots grid h-full w-full place-items-center">
      <Image
        src={src}
        fill
        className="object-contain"
        alt={alt ?? "Blog image"}
      />
      </div>
    </div>
  )
}


export const Intro = ({ children }: HandlerProps<"p">) => (
  <p className="text-f-h3-mobile text-brand-w2 lg:text-f-h3 [&_b]:font-bold [&_b]:text-brand-w1">
    {children}
  </p>
)

export const Paragraph = ({ children }: HandlerProps<"p">) => (
  <p className="!text-pretty text-blog text-brand-white [&_b]:font-bold [&_b]:text-brand-white">
    {children}
  </p>
)

export const Heading2 = ({ children }: HandlerProps<"h2">) => (
  <h2 className="text-balance text-f-h2-mobile text-brand-w1 lg:text-f-h2 [&_b]:font-semibold">
    {children}
  </h2>
)

export const Heading3 = ({ children }: HandlerProps<"h3">) => (
  <h3 className="text-balance text-f-h3-mobile text-brand-w1 lg:text-f-h3 [&_b]:font-semibold">
    {children}
  </h3>
)

export const BlogLink = ({
  children,
  href,
  target,
  rel
}: HandlerProps<"a">) => (
  <Link
    href={href}
    target={target as "_blank" | "_self"}
    rel={rel}
    className="font-semibold text-brand-w1 underline"
  >
    {children}
  </Link>
)

export const OrderedList = ({ children }: HandlerProps<"ol">) => (
  <ol className="list-decimal pl-5 text-brand-w2 marker:text-brand-o [&_ol]:marker:!text-brand-g1">
    {children}
  </ol>
)

export const UnorderedList = ({ children }: HandlerProps<"ul">) => (
  <ul className="blog-list list-none pl-5 text-brand-w2 marker:text-brand-o [&_ul]:marker:!text-brand-g1">
    {children}
  </ul>
)

export const ListItem = ({ children }: HandlerProps<"li">) => (
  <li className="blog-list-item pl-2 text-brand-w2 marker:text-f-p-mobile lg:text-f-p">
    {children}
  </li>
)

export const Code = ({ children }: HandlerProps<"code">) => (
    <code className="md:tracking-2 rounded-md border border-brand-g2 bg-codeblock-k2 px-1 font-mono text-f-p-mobile font-semibold lg:text-f-p">
      {children}
    </code>
)

export const Pre = ({ language, code }: HandlerProps<"pre">) => (
  <div className="w-full overflow-hidden group">
    <BaseCodeBlock
      snippets={[{ code: `${code}`, language: language, id: "1" }]}
      childrenTop={<div className="relative"><StandaloneCopyButton code={code} /></div>}
      childrenBottom={
        // @ts-expect-error wokaround for the fact that the language is not typed correctly
        language !== "text" ? (
          <div className="border-t border-brand-w1/30 p-3 text-f-p-mobile text-brand-g1 lg:text-f-p flex items-center gap-2">
            <span>{language || "Unknown"}</span>
          </div>
        ) : null
      }
      singleFile={true}
    />
  </div>
)

export const CodeBlock = ({
  items
}: {
  items: {
    _id: string
    _title: string
    code: {
      code: string
      language: Language
    }
  }[]
}) => {
  return (
    <div className="custom-block sandbox group flex w-full flex-col gap-y-2">
      <BaseCodeBlock
        childrenTop={<CodeGroupHeader items={items} />}
        childrenBottom={<CodeGroupBottom />}
        snippets={items.map((file) => ({
          code: `${file.code.code}`,
          language: file.code.language,
          label: file._title
        }))}
      />
    </div>
  )
}
