/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');


 dotenv.config({ path: './.env' });

 console.log(process.env.DATABASE)
 
 const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   process.env.DATABASE_PASSWORD
 );
 
 mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false
   })
   .then(() => console.log("DB connection successful!"));
 