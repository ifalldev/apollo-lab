import Tweet from '../../models/Tweet';

export default {
  getTweet: (parent, { _id }) => Tweet.findById(_id),
  getTweets: () => Tweet.find({}).sort({ createdAt: -1 }),
  createTweet: (parent, args, context) => {
    console.log('============================================');
    console.log('CONTEXT', context);
    console.log('============================================');
    return Tweet.create(args)
  },
  updateTweet: (parent, { _id, ...rest }) => Tweet.findByIdAndUpdate(_id, rest, { new: true }),
  deleteTweet: async(parent, { _id }) => {
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