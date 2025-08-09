const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(
	()=>{
		console.log('connected to db');
		app.listen(process.env.PORT,()=>console.log('server running on port',process.env.PORT));
	}
).catch(
	err=>{
		console.log('db connection error',err);
	}
);
