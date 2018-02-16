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

  getUserTweets: async (parent, args, { user }) => {
    return gate(user, () => Tweet.find({ user: user._id }).sort({ createdAt: -1}));
  },

  updateTweet: async (parent, { _id, ...rest }, { user }) => {
    try {
      const tweet = await Tweet.findOne({ _id, user: user._id });

      if (!tweet) throw new Error('Not your tweet');
      // como ja trouxemos o tweet para validação
      // alteramos os dados diretamente nele
      // iterando-o e comparando-o com os valores atualizados
      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value;
      })

      return gate(user, () => tweet.save());
    } catch (error) {
      throw error;
    }
  },

  deleteTweet: async(parent, { _id }, { user }) => {
    await gate(user);
    try {
      const tweet = await Tweet.findOne({ _id, user: user._id });

      if (!tweet) throw new Error('Not found');

      await tweet.remove();

      return {
        message: 'Delete Success'
      }
    } catch (error) {
      throw error;
    }
  }
}