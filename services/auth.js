import jwt from 'jsonwebtoken';

import cons from '../config/cons';

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