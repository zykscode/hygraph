import { gql } from "graphql-request";
import { graphcms } from "./_graphcms";

export const GetNextAuthUserByEmail = async({params}:any)=> {
  return graphcms.request(`
  query GetAuthorByEmail($email: String!) {
    author(where: { email: $email }) {
      id
      password
    }
  }
`,{
  email:params.email,
});}

export const CreateNextAuthUserByEmail = async ({params}:any) => {
  return graphcms.request(`
  mutation CreateNextAuthAuthourByEmail($email: String!, $password: String!) {
    createAuthor(data: { email: $email, password: $password }) {
      id
    }
  }
`,{
  email:params.email,
  password:params.password,
});}

export const indexPageQuery = gql`
  query indexPageQuery($limit: Int!, $offset: Int!) {
    postsConnection(first: $limit, skip: $offset, orderBy: publishedAt_DESC) {
      posts: edges {
        node {
          id
          author {
            id
            name
            avatar {
              url
            }
            slug
          }
          title
          tags {
            name
            colors
            slug
          }
          slug
          createdAt
          summary
          content {
            markdown
          }
          coverPhoto {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const blogPageQuery = async ({ params }: { params: any }) => {
  const limit = 1;
  return graphcms.request(
    `
    query blogPageQuery($limit: Int!, $offset: Int!) {
      postsConnection(first: $limit, skip: $offset, orderBy: publishedAt_DESC) {
        posts: edges {
          node {
            id
            author {
              id
              name
              avatar {
                url
              }
              slug
            }
            title
            tags {
              name
              colors
              slug
            }
            slug
            createdAt
            summary
            content {
              markdown
            }
            coverPhoto {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
    {
      limit,
      offset: Number(params.page - 1) * limit,
    },
  );
};