const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const UserSchema = new Schema({
  user_id: Number,
  first_name: String,
  last_name: String,
  photo_50: String,
});
const User = mongoose.model('User', UserSchema);

const create = async (fields) => {
    const user = new User(fields);
    await user.save();
    return user;
}

const getByUserId = async user_id => {
    return await User.findOne({
        user_id
    }).exec()
    .then(user => user);
}

module.exports = {
    create,
    getByUserId
}