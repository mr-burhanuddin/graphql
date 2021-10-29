const { gql } = require('apollo-server');

module.exports = gql`
  type Event {
    id: ID!
    username: String!
    img: String!
    eventname: String!
    link: String!
    price: Int!
    contact: String!
    category: String!
    date: String!
    presentationtype: String!
    description: String!
    createdAt: String!
    type: String!
    city: String!
    state: String!
    country: String!
    zip: Int!
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
  type Location {
    city: String!
    state: String!
    country: String!
    zip: Int!
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
    createEvent(
      eventname: String!
      link: String!
      img: String!
      price: Int!
      contact: String!
      category: String!
      date: String!
      presentationtype: String!
      description: String!
      type: String!
      city: String!
      state: String!
      country: String!
      zip: Int!
    ): Event!
    deleteEvent(eventId: ID!): String!
    createComment(eventId: ID!, body: String!): Event!
    deleteComment(eventId: ID!, commentId: ID!): Event!
    likePost(eventId: ID!): Event!
  }
`;
