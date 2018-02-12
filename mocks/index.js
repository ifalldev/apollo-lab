import faker from 'faker';

import Tweet from '../models/Tweet';
import User from '../models/User';

const TWEET_TOTAL = 10;
// console.log('MOCK TEST');
export default async () => {
  try {
    await Tweet.remove();
    await User.remove();

    await Array.from({ length: TWEET_TOTAL }).forEach(
      async () => await Tweet.create({ text: faker.lorem.paragraphs(1) })
    );
  } catch (err) {
    throw err;
  }
}