const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcryptjs');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		googleId: {
			type: String,
			required: true,
			trim: true,
		},
		thumbnail: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = model('User', UserSchema);
