require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const passportSetup = require('./config/passport-setup');
const connectDB = require('./db/db');

const keys = require('./config/keys');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

const app = express();

// set up view engine

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));

// initialize passport (For use, cookie and session)
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('home', {user:req.user});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});