import { fragmentOn } from "basehub"

// import { IMAGE_FRAGMENT } from "@/lib/basehub/fragments"

export const query = fragmentOn("Query", {
  pages: {
    blog: {
      posts: {
        items: {
          _sys: {
            createdAt: true
          },
          _title: true,
          _slug: true,
          date: true,
          intro: {
            json: { content: true }
          },
          categories: {
            items: {
            _title: true
            }
          },
          content: {
            json: {
              content: true,
              blocks: {
                __typename: true,
                on_TweetComponent: {
                  __typename: true,
                  _id: true,
                  tweetId: true
                },
                on_YoutubeComponent: {
                  __typename: true,
                  _id: true,
                  youtubeId: true
                },
                on_VideoComponent: {
                  __typename: true,
                  _id: true,
                  videoUrl: true
                },
                on_MathComponent: {
                  __typename: true,
                  _id: true,
                  formula: true
                },
              }
            }
          },
          hero: {
            heroImage: {
              url: true,
              blurDataURL: true,
              alt: true,
              width: true,
              height: true
            },
            // heroVideo: {
            //   url: true
            // }
          },
          authors: {
            _title: true
          }
        }
      },
      categories: {
        items: {
          _title: true
        }
      }
    }
  }
})

export type QueryType = fragmentOn.infer<typeof query>