export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: {
      url: string;
    };
    slug: string;
  };
  title: string;
  tags: {
    name: string;
    colors: string;
    slug: string;
  }[];
  slug: string;
  createdAt: string;
  summary: string;
  content: {
    markdown: string;
  };
  coverPhoto: {
    url: string;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
}

export interface PostsConnection {
  posts: { node: Post }[];
  pageInfo: PageInfo;
}

export interface QueryData {
 data:{ postsConnection: PostsConnection};
} 