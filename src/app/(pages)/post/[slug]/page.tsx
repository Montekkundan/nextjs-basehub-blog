import { Pump } from "basehub/react-pump"
import { notFound } from "next/navigation"

import { client } from "@/service/basehub"

import { Content } from "./content"
// import { More } from "./more"
import { query } from "./query"
import { BlogTitle } from "./title"
import { Metadata } from "next"

type Params = Promise<{ slug: string }>

export const dynamic = "force-static"
export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  try {
    // Use client() to fetch data correctly
    const data = await client().query(query)
    
    // Find the post with the matching slug
    const post = data?.pages?.blog?.posts?.items?.find(
      post => post?._slug === params.slug
    );

    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.'
      }
    }

    // Extract post info
    const title = post?._title
    const description =  "Read this blog by Montek"
    
    // Get the hero image URL directly from the post
    const heroImageUrl = post?.hero?.heroImage?.url

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.montek.dev/post/${params.slug}`,
        siteName: "Montek",
        images: heroImageUrl ? [
          {
            url: heroImageUrl,
            width: 1200,
            height: 630,
            alt: title || 'Blog post image'
          }
        ] : undefined,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: heroImageUrl ? [heroImageUrl] : undefined,
        creator: "@montekkundan",
        site: "@montekkundan",
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post',
      description: 'Montek is a developer'
    }
  }
}


const Blog = async (props: { params: Promise<Params> }) => {
  const resolvedParams = await props.params
  try {
    return (
      <Pump queries={[query]}>
        {async ([data]) => {
          "use server"
          return (
            <>
              <div className="relative bg-brand-k pt-12 lg:pb-24">
                <div className="lg:pb-25 flex flex-col gap-24">
                  <BlogTitle data={data} slug={resolvedParams.slug} />
                  <Content data={data} slug={resolvedParams.slug} />
                  {/* <More data={data} slug={resolvedParams.slug} /> */}
                </div>
              </div>
            </>
          )
        }}
      </Pump>
    )
  } catch {
    return notFound()
  }
}

export async function generateStaticParams() {
  const data = await client().query({
    pages: {
      blog: {
        posts: {
          items: { _slug: true }
        }
      }
    }
  })

  return data.pages.blog.posts.items.map((post) => ({
    slug: post._slug
  }))
}

export default Blog