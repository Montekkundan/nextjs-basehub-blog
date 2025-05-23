import { fragmentOn } from "basehub"

import { client } from "@/service/basehub"

interface BlogQueryResult {
  pages: {
    blog: {
      posts: {
        items: Post[];
        _meta: {
          filteredCount: number;
        };
      };
    };
  };
}


const HeroFragment = fragmentOn("HeroComponent", {
  heroImage: {
    url: true,
    blurDataURL: true,
    alt: true,
    width: true,
    height: true
  }
})

const PostFragment = fragmentOn("PostsItem", {
  _id: true,
  _title: true,
  _slug: true,
  slug: true,
  categories: {
    items: {
      _title: true,
      _slug: true
    }
  },
  date: true,
  intro: {
    json: {
      content: true
    }
  },
  hero: HeroFragment
})

export type Post = fragmentOn.infer<typeof PostFragment>

export const fetchPosts = async (category?: string) => {
  const query = {
    pages: {
      blog: {
        posts: {
          __args: {
            orderBy: "date__DESC" as const,
          },
          items: {
            ...PostFragment
          },
          _meta: {
            filteredCount: true
          }
        }
      }
    }
  };
  
  const posts = await client().query(query) as unknown as BlogQueryResult;
  
  if (category && posts?.pages?.blog?.posts?.items) {
    const filteredPosts = posts.pages.blog.posts.items.filter(post => 
      post.categories?.items?.some(cat => cat._slug === category)
    );
    
    return {
      posts: filteredPosts,
      total: filteredPosts.length
    };
  }

  return {
    posts: posts.pages.blog.posts.items,
    total: posts.pages.blog.posts._meta.filteredCount
  }
}

export const fetchFeaturedPost = async () => {
  const posts = await client().query({
    pages: {
      blog: {
        posts: {
          item: { ...PostFragment },
          __args: {
            first: 1,
            orderBy: "date__DESC"
          }
        }
      }
    }
  })

  return posts.pages.blog.posts.item
}


export const fetchCategories = async () => {
  const categories = await client().query({
    pages: {
      blog: {
        categories: {
          items: {
            _title: true,
            _slug: true
          }
        }
      }
    }
  })

  return categories.pages.blog.categories.items
}

export const fetchCategoriesNonEmpty = async () => {
  const res = await client().query({
    pages: {
      blog: {
        posts: {
          items: {
            categories: {
              items: {
                _title: true,
                _slug: true
              }
            }
          }
        }
      }
    }
  })

  const categories = res.pages.blog.posts.items.flatMap((post) =>
    post.categories ? post.categories.items.map(item => ({ _title: item._title, _slug: item._slug })) : []
  );

  const uniqueCategories = Array.from(
    new Map(categories.map((c) => [c?._slug, c])).values()
  )

  return uniqueCategories.filter((c) => c !== undefined)
}