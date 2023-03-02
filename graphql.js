const { request } = require('graphql-request');
const { createHandler } = require('graphql-serverless');

const endpoint = '<your-wordpress-url>/graphql';

const schema = `#graphql
type Post {
  id: ID!
  title: String!
  content: String
}

type Query {
  posts: [Post!]!
}
`;

const resolvers = {
  Query: {
    async posts() {
      const query = `#graphql
        query {
          posts {
            nodes {
              id
              title
              content
            }
          }
        }
      `;

      const data = await request(endpoint, query);
      return data.posts.nodes;
    },
  },
};

const handler = createHandler({ schema, resolvers });

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    return handler(req, res);
  }
  if (req.method === 'POST') {
    return handler(req, res);
  }
  return res.status(405).send('Method Not Allowed');
};
