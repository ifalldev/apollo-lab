import User from '../../models/User';
import { gate } from '../../services/auth';

export default {
  signup: async (parent, { fullName, ...rest }) => {
    try {
      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, ...rest });

      return { token: user.createToken() };
    } catch (error) {
      throw error;
    }
  },

  login: async (parent, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) throw new Error('User not exist!');
      if (!user.authenticateUser(password)) throw new Error('Password don\'t match');

      return { token: user.createToken() };
    } catch (error) {
      throw error;
    }
  },

  me: async(parent, args, { user }) => {
    return gate(user, () => User.findById(user._id));
  }
}