import User from '../../models/User';

export default {
  signup: (parent, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');

    return User.create({ firstName, lastName, ...rest });
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error('User not exist!');

    if (!user.authenticateUser(password)) throw new Error('Password don\'t match');

    return user;
  }
}