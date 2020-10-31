const mongoose = require('mongoose');
const chalk = require("chalk");

module.exports = {
  init: () => {
    mongoose.connect(process.env.MONGO, { 
	  useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
		 } )
    mongoose.set('useFindAndModify', false)
    mongoose.Promise = global.Promise;
    
    mongoose.connection.on('connected', () => {
      console.log(chalk.green('[ DATABASE CONNECT ]'));
    });
    
    mongoose.connection.on('err', err => {
      console.error(`${chalk.red('[ DB ERROR ]')}\n${err.stack}`);
    });
    
    mongoose.connection.on('disconnected', () =>{
      console.warn('[ DATABASE DISCONNECTED ]');
    });
  }
  
}
