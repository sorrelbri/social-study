const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, 
  { useNewUrlParser: true, useCreateIndex: true }
);

const db = mongoose.connection;

db.on('connected', () => console.log(`Connected to Mongo DB at ${db.host}:${db.port}`));