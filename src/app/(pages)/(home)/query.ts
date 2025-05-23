import { fragmentOn } from "basehub"

import { IMAGE_FRAGMENT} from "@/lib/basehub/fragments"

export const query = fragmentOn("Query", {
  pages: {
    homepage: {
      intro: {
        title: {
          json: {
            content: true
          }
        },
        subtitle: {
          json: {
            content: true
          }
        }
      },
      capabilities: {
        _title: true,
        intro: {
          json: {
            content: true
          }
        }
      },
      featuredBlogs: {
        projectList: {
          items: {
            _title: true,
            excerpt: true,

            project: {
              contentSlug: true,
            },
            cover: IMAGE_FRAGMENT
          }
        }
      },
    }
  },
  me: {
    projects: {
      projectCategories: {
        items: {
          _title: true,
          description: true,
          subCategories: {
            items: {
              _title: true
            }
          }
        }
      }
    }
  }
})

export type QueryType = fragmentOn.infer<typeof query>