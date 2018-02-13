import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

const gate = async (user, callback) => {
  try {
    await requireAuth(user);
    return callback && callback();
  } catch (error) {
    throw error;
  }
}

export default {
  getTweet: (parent, { _id }, { user }) => {
    return gate(user, () => Tweet.findById(_id));
    // try {
    //   await requireAuth(user);
    //   return Tweet.findById(_id)
    // } catch (error) {
    //   throw error;
    // }
  },
  getTweets: (parent, args, { user }) => {
    return gate(user, () => Tweet.find({}).sort({ createdAt: -1 }));
    // try {
    //   await requireAuth(user);
    //   return Tweet.find({}).sort({ createdAt: -1 });
    // } catch (error) {
    //   throw error;
    // }
  },
  createTweet: (parent, args, { user }) => {
    return gate(user, () => Tweet.create(args));
    // await requireAuth(user);
    // return Tweet.create(args)
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