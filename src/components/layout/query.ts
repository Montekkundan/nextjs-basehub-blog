import { fragmentOn } from "basehub"

export const query = fragmentOn("Query", {
  pages: {
    blog: {
      posts: {
        items: {
          _slug: true
        }
      }
    }
  },
  me: {
    social: {
      github: true,
      instagram: true,
      twitter: true,
      linkedIn: true,
    }
  }
})

export type QueryType = fragmentOn.infer<typeof query>