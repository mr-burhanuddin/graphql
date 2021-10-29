const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
  username: String,
  img: String,
  eventname: String,
  link: String,
  contact: String,
  category: String,
  price: Number,
  date: String,
  presentationtype: String,
  description: String,
  createdAt: String,
  type: String,
  city: String,
  state: String,
  country: String,
  zip: Number,
  comments: [
    {
      username: String,
      body: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Event', eventSchema);
