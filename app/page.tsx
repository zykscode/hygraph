import { indexPageQuery } from "#/services";


async function getData() {
  async function fetchPosts() {
    let offset = 0;
    let hasNextPage = true;
    const limit = 2;

    const allPosts = [];

    while (hasNextPage) {
      const { data } = await indexPageQuery({ limit, offset })
      const {
        postsConnection: { posts, pageInfo },
      } = data

      hasNextPage = pageInfo.hasNextPage;
      offset += limit;

      allPosts.push(...posts);
    }

    return allPosts;
  }

  const posts = (await fetchPosts()).map(({ node }) => node);


  return {
    posts,
  };
}

async function auth(params:any) {
  
}

export default async function Home() {
  const data = await getData()
  console.log(data)
  return (

    <main >
      <h1>Blog</h1>
    </main>
  )
}
