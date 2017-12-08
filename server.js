const express 		= require('express'),
      http 			= require('http'),
      morgan        = require('morgan'),
      path          = require('path') ,
      bodyParser 	= require('body-parser'),
      router        = express.Router(),
      routes        = require('./app/config/routes'),
      database      = require(path.resolve("./app/config/libs/mongoose"));
      
class Server{

    constructor(){
       /*defining PORT for application*/
		this.port   = 3000;
		
		/*init express app*/
		this.app    = express();
		
		/*init a sever*/
        this.server = http.createServer(this.app);
        
        /* express router */
		this.router = router;
        
        /*routes created */
        this.routes;
    }//constructor()

    appConfig(){
		/*allow application to read and send data in body*/
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true}));
    }//appConfig()

    connectoToDB(){
        /* object of databse is creted its method
           "dbConnect() is called"*/
		new database().dbConnect();
    }//connectoToDB()

    initRoutes(){
        /* routes are intialezied and "this.app" &
           "this.router" are passed in constructor */
		this.routes = new routes(this.app, this.router).init();
    }//initRoutes()
    
    morgon(){
        this.app.use(morgan('dev'));
    }//morgon()
    
    setStaticPaths(){
		this.app.use(express.static(__dirname + '/public'));	
    }//setStaticPaths()

    setAPIRoutes(){
        /*routin admin_api */
         this.app.use("/admin_api",this.routes);
    }//setAPIRoutes()

    allowToServe(){

        // if /api/:route -> 
        // else /:route then render index.html

        this.app.get('*', (req, res) => {
            
            res.sendFile(path.resolve('./public/index.html'));
       });
    }//allowToServer()
    
    listen(){
        console.log("in listen");
        this.server.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
            });
    }//listen()
    
    init(){
        
        this.appConfig();//bodyparser
        this.connectoToDB();//dtabse connection
        this.morgon();//to see log info in console
        this.initRoutes();
        this.setStaticPaths();
        this.setAPIRoutes();
        this.allowToServe();
        this.listen();
    }//init()

}//server

      
let application= new Server();

application.init();//calling of init()

