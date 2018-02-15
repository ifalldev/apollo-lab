import Tweet from '../../models/Tweet';
import { gate } from '../../services/auth';

export default {
  getTweet: (parent, { _id }, { user }) => {
    return gate(user, () => Tweet.findById(_id));
  },

  getTweets: (parent, args, { user }) => {
    return gate(user, () => Tweet.find({}).sort({ createdAt: -1 }));
  },

  createTweet: (parent, args, { user }) => {
    return gate(user, () => Tweet.create({ ...args, user: user._id }));
  },

  updateTweet: (parent, { _id, ...rest }, { user }) => {
    return gate(user, () => Tweet.findByIdAndUpdate(_id, rest, { new: true }));
  },

  deleteTweet: async(parent, { _id }, { user }) => {
    await gate(user);
    try {
      await Tweet.findByIdAndRemove(_id);
      return {
        message: 'Delete Success'
      }
    } catch (error) {
      throw error;
    }
  }
}