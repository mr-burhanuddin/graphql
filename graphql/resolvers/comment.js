const { UserInputError, AuthenticationError } = require('apollo-server');
const Event = require('../../models/Events');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Mutation: {
    async createComment(_, { eventId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Comment Cannot Be Empty', {
          errors: {
            body: 'comment body cannot be empty',
          },
        });
      }
      const event = await Event.findById(eventId);

      if (event) {
        event.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await event.save();
        return event;
      } else {
        throw new UserInputError('Post Not Found');
      }
    },
    async deleteComment(_, { eventId, commentId }, context) {
      const { username } = checkAuth(context);
      const event = await Event.findById(eventId);

      if (event) {
        const commentIndex = event.comments.findIndex(
          (c) => c.id === commentId
        );
        if (event.comments[commentIndex].username === username) {
          event.comments.splice(commentIndex, 1);
          await event.save();
          return event;
        } else {
          throw new AuthenticationError('Action Not allowed');
        }
      } else {
        throw new UserInputError('Post Not Found');
      }
    },
  },
};
