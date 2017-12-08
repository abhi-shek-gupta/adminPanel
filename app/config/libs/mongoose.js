const mongoose  = require('mongoose'),
      Path      = require('path'),
      config    =   require(Path.resolve('./app/config/config.js')) ;
      
      
 class Database{

    constructor(){
        //name of database
        this.db = "blogger";
    }

    dBconnection(mongoose){

        /*turn on debug mode-print mongo query on console */
        mongoose.set('debug', true)
        
        /* to enable native promise of mongoose */
        mongoose.Promise = global.Promise; 
        
        /*connect to Mongodb */
        mongoose.connect(config.databaseUrl, {useMongoClient:true});
        
        /*if database connected successfully*/
		mongoose.connection.on('connected', (err, result) => {
		    console.log(`Successfully connected to DB: ${this.db}`);
		});

		/*if unable to connect to DB*/
		mongoose.connection.on('error', (err) => {
		    console.log(`Failed to connect to DB: ${this.db}, ${err}`);
		});

		/*if connection has been break due to any reason*/
		mongoose.connection.on('disconnected', (err) => {
			console.log(`Default connection to DB: ${this.db} disconnected`);
		});
    }

    /*bind all functions together into single function*/
	dbConnect(){
		this.dBconnection(mongoose);
	}
 }

 module.exports = Database;