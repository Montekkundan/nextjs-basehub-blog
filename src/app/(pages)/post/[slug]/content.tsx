import { RichText } from "basehub/react-rich-text"

import { cn } from "@/lib/utils"

import { Back } from "./back"
import {
  BlogImage,
  BlogLink,
  // BlogVideo,
  Code,
  Heading2,
  Heading3,
  Intro,
  OrderedList,
  Paragraph,
  Pre,
  UnorderedList
} from "./blog-components"
import { BlogMeta } from "./blog-meta"
import { CustomTweet } from "./components/tweet"
import { Youtube } from "./components/youtube"
import { CustomVideo } from "./components/video"
import { QueryType } from "./query"
import { Math } from "./components/math"

interface ContentProps {
  data: QueryType
  slug: string
}

type ContentJson = {
  content: any;
  blocks?: any;
};

export const Content = ({ data, slug }: ContentProps) => {
  if (!data?.pages?.blog?.posts?.items) {
    return <div>Error: Data is not available</div>;
  }

  const post = data.pages.blog.posts.items.find((post) => post._slug === slug)
  const intro = post?.intro?.json.content
  
  const json = post?.content?.json as ContentJson | undefined
  const content = json?.content
  const blocks = json?.blocks
//   console.log("Content data:", data);
  return (
    <div className="grid-layout">
      <div className="col-span-full lg:top-13 lg:col-span-1">
        <Back />
      </div>
      <div className="col-span-full flex flex-col items-center justify-start lg:col-span-10 lg:col-start-2">
        {post && <BlogMeta categories data={post as any} />}
        <article
          className={cn(
            "flex w-full flex-col items-start text-brand-w2 lg:max-w-[846px]",
            // 24px between elements
            "[&>*]:mt-6",
            // 32px to headings
            "[&>h2]:mt-12",
            // 32 px to custom blocks
            "[&>.custom-block]:mt-6"
          )}
        >
          <RichText
            content={intro}
            components={{
              p: (props) => <Intro>{props.children}</Intro>
            }}
          />
          <RichText
            content={content}
            components={{
              img: (props) => <BlogImage {...props} />,
              p: (props) => <Paragraph>{props.children}</Paragraph>,
              h2: (props) => (
                <Heading2 id={props.id}>{props.children}</Heading2>
              ),
              h3: (props) => (
                <Heading3 id={props.id}>{props.children}</Heading3>
              ),
              hr: () => (
                <hr className="border-brand-w1/20 w-full" />
              ),
              a: (props) => (
                <BlogLink
                  href={props.href}
                  target={props.target}
                  rel={props.rel}
                  internal={undefined}
                >
                  {props.children}
                </BlogLink>
              ),
              ul: (props) => (
                <UnorderedList data-is-task-list={false}>
                  {props.children}
                </UnorderedList>
              ),
              ol: (props) => <OrderedList start={props.start ?? 1}>{props.children}</OrderedList>,
              li: (props: { children: React.ReactNode; checked?: boolean }) => {
                if (props.checked !== undefined) {
                  // Task list item
                  return (
                    <li data-is-task-list="true" data-checked={!!props.checked} className="blog-list-item pl-2 text-brand-w2 marker:text-f-p-mobile lg:text-f-p">
                      {props.children}
                    </li>
                  );
                }
                // Normal list item
                return (
                  <li className="blog-list-item pl-2 text-brand-w2 marker:text-f-p-mobile lg:text-f-p">
                    {props.children}
                  </li>
                );
              },
              code: (props) => <Code>{props.children}</Code>,
              pre: (props) => (
                <Pre code={props.code} language={props.language}>
                  {props.children}
                </Pre>
              ),
              video: (props) => (
                props.src ? (
                  <CustomVideo videoUrl={props.src} />
                ) : null
              ),
              TweetComponent: (props) => <CustomTweet id={props.tweetId} />,
              YoutubeComponent: (props) => <Youtube youtubeId={props.youtubeId} />,
              VideoComponent: (props) => <CustomVideo videoUrl={props.videoUrl} />,
              MathComponent:(props) => (
                <Math
                  formula={props.formula}
                />
              )
            }}
            blocks={blocks}
          />
        </article>
        <BlogMeta categories={false} data={post as any} />
      </div>
    </div>
  )
}