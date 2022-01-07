const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB is connecting...');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;