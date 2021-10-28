const eventsResolvers = require('./events');
const usersResolvers = require('./users');
const commentResolvers = require('./comment');

module.exports = {
  Query: {
    ...eventsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...eventsResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
