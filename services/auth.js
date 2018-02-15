import jwt from 'jsonwebtoken';

import cons from '../config/cons';
import User from '../models/User';

export async function requireAuth(user) {
  if (!user || !user._id) throw new Error('Unauthorized');

  const me = await User.findById(user._id);

  if (!me) throw new Error('Unauthorized');

  return me;
}

export function decodeToken(token) {
  const arr = token.split(' ');
  if(arr[0] === 'Bearer'){
    console.log('============================================');
    console.log('TOKEN', arr[1]);
    console.log('============================================');
    console.log('TOKEN VERIFIED', jwt.verify(arr[1], cons.JWT_SECRET))
    console.log('============================================');
    return jwt.verify(arr[1], cons.JWT_SECRET);
  }

  throw new Error('Token not valid')
}

export async function gate(user, callback) {
  try {
    await requireAuth(user);
    return callback && callback();
  } catch (error) {
    throw error;
  }
}