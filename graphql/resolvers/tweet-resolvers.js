import Tweet from '../../models/Tweet';

export default {
  getTweet: (parent, { _id }) => Tweet.findById(_id),
  getTweets: () => Tweet.find({})
}