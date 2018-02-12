import User from '../../models/User';

export default {
  signup: async (parent, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');
    const user = await User.create({ firstName, lastName, ...rest });
    console.log('============================================');
    console.log('SIGNUP USER', user);
    console.log('============================================');
    return {
      token: user.createToken()
    }
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error('User not exist!');

    if (!user.authenticateUser(password)) throw new Error('Password don\'t match');

    return user;
  }
}