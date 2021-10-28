const { AuthenticationError, UserInputError } = require('apollo-server');
const Event = require('../../models/Events');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    async getAllEvent() {
      try {
        const event = await Event.find().sort({ createAt: -1 });
        return event;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getEvent(_, { eventId }) {
      try {
        const event = await Event.findById(eventId);
        if (event) {
          return event;
        } else {
          throw new Error('Event Not Found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createEvent(_, { body }, context) {
      const user = checkAuth(context);
      const newEvent = new Event({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const event = await newEvent.save();
      return event;
    },
    async deleteEvent(_, { eventId }, context) {
      const user = checkAuth(context);
      try {
        const event = await Event.findById(eventId);
        if (user.username === event.username) {
          await event.delete();
          return 'Event Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not Allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { eventId }, context) {
      const { username } = checkAuth(context);

      const event = await Event.findById(eventId);
      if (event) {
        if (event.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          event.likes = event.likes.filter(
            (like) => like.username !== username
          );
        } else {
          // Not liked, like post
          event.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await event.save();
        return event;
      } else throw new UserInputError('Post not found');
    },
  },
};
