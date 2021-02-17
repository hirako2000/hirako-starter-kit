const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * User schema
 */
const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  salt: { type: String, default: '' },
  description: { type: String, default: '' },
});

UserSchema.plugin(passportLocalMongoose);

/**
 * Can add here some some
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 *  Removes certain properties from the json representation
 */
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  return obj;
};

/**
 * Statics
 */
UserSchema.static({});

module.exports = mongoose.model('User', UserSchema);
