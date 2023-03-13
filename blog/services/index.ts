import { gql } from "graphql-request";

export const GetNextAuthUserByEmail = gql`
  query GetAuthorByEmail($email: String!) {
    author(where: { email: $email }) {
      id
      password
    }
  }
`;

export const CreateNextAuthUserByEmail = gql`
  mutation CreateNextAuthAuthourByEmail($email: String!, $password: String!) {
    createAuthor(data: { email: $email, password: $password }) {
      id
    }
  }
`;

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