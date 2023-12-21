// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  thumbnail: String,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
