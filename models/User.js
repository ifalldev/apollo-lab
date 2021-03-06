import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import cons from '../config/cons';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  if (this.isModified('password')){
    this.password = this._hashPassword(this.password);
    return next();
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  authenticateUser(password) {
    return compareSync(password, this.password)
  },

  createToken() {
    console.log('============================================');
    console.log('CREATING TOKEN WITH ID', this._id)
    console.log('============================================');
    return jwt.sign({
      _id: this._id
    }, cons.JWT_SECRET)
  }
}

export default mongoose.model('User', UserSchema);