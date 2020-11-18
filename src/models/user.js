import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  nickname: String,
  point: Number,
});

// setting password by using bcrypt
UserSchema.methods.setPassword = async function (password) {
  const saltRound = Math.floor(Math.random() * 5);
  const hash = await bcrypt.genSalt(saltRound).then((salt) => {
    return bcrypt.hash(password, salt);
  });
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.setNickname = function (nickname) {
  this.nickname = nickname;
};

UserSchema.methods.setPoint = function (point) {
  this.point = point;
};

UserSchema.methods.variationPoint = function (variation) {
  this.point += variation;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  return token;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.statics.findByUsername = async function (username) {
  return await this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
