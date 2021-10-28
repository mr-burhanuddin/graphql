const { gql } = require('apollo-server');

module.exports = gql`
  type Event {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getAllEvent: [Event]
    getEvent(eventId: ID!): Event!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createEvent(body: String!): Event!
    deleteEvent(eventId: ID!): String!
    createComment(eventId: ID!, body: String!): Event!
    deleteComment(eventId: ID!, commentId: ID!): Event!
    likePost(eventId: ID!): Event!
  }
`;
