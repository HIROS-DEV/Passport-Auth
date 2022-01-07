const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');

const User = require('../models/User');

passport.serializeUser((user, done) => {
	// userid in MongoDB(not google id)
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		console.log(error);
	}
})

passport.use(
	new GoogleStrategy(
		{
			// options for the google strategy
			callbackURL: '/auth/google/redirect',
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// check if user already exist in MongoDB
				const existUser = await User.findOne({
					googleId: profile.id,
				});
				if (existUser) {
					console.log('user exists already');
					done(null, existUser);
				} else {
					const newUser = new User({
						username: profile.displayName,
						googleId: profile.id,
						thumbnail: profile._json.picture,
					});
					await newUser.save();
					console.log('new user created');
					done(null, newUser);
				}
			} catch (error) {
				console.log(error);
			}
		}
	)
);
