import User from '../../models/User';

export default {
  signup: (parent, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');

    return User.create({ firstName, lastName, ...rest });
  }
}