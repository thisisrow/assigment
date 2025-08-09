const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
const {MONGO_URI,PORT}= require('./config');

mongoose.connect(MONGO_URI).then(
	()=>{
		console.log('connected to db');
		app.listen(PORT,()=>console.log('server running on port',PORT));
	}
).catch(
	err=>{
		console.log('db connection error',err);
	}
);
