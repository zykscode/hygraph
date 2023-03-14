
// export const GetNextAuthUserByEmail = async ({ params }: any) => {
//   return graphcms.request(`
//   query GetAuthorByEmail($email: String!) {
//     author(where: { email: $email }) {
//       id
//       password
//     }
//   }
// `, {
//     email: params.email,
//   });
// }

import { QueryData } from "#/lib/types";

// export const CreateNextAuthUserByEmail = async ({ params }: any) => {
//   return graphcms.request(`
//   mutation CreateNextAuthAuthourByEmail($email: String!, $password: String!) {
//     createAuthor(data: { email: $email, password: $password }) {
//       id
//     }
//   }
// `, {
//     email: params.email,
//     password: params.password,
//   });
// }



export const indexPageQuery = async ({ limit, offset }: { limit: number; offset: number }): Promise<QueryData> => {
  const response = await fetch(process.env.GRAPHCMS_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ($limit: Int!, $offset: Int!) {
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
      `,
      variables: {
        limit,
        offset,
      },
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return data as QueryData;
  } else {
    throw new Error(`GraphQL request failed: ${data.errors?.map((error: any) => error.message).join(', ')}`);
  }
};


// export const blogPageQuery = async ({ params }: { params: any }) => {
//   const limit = 1;
//   return graphcms.request(
//     `
//     query blogPageQuery($limit: Int!, $offset: Int!) {
//       postsConnection(first: $limit, skip: $offset, orderBy: publishedAt_DESC) {
//         posts: edges {
//           node {
//             id
//             author {
//               id
//               name
//               avatar {
//                 url
//               }
//               slug
//             }
//             title
//             tags {
//               name
//               colors
//               slug
//             }
//             slug
//             createdAt
//             summary
//             content {
//               markdown
//             }
//             coverPhoto {
//               url
//             }
//           }
//         }
//         pageInfo {
//           hasNextPage
//           hasPreviousPage
//         }
//       }
//     }
//   `,
//     {
//       limit,
//       offset: Number(params.page - 1) * limit,
//     },
//   );
// };