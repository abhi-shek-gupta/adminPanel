const   expressJWT      =   require('express-jwt'),
        fs              =   require("fs"),
        path            =   require("path"),
        config          =   require(path.resolve("./app/config/config"));
class AppRouter{
    constructor(app,router){
        this.call = {
            frontend : {},
            backend : {}
        };

        this.frontend={};
        this.backend ={};

        this.app = app;
        this.router = router;
    }

    loadAdminClasses(){
        fs.readdirSync(path.resolve('./app/controllers/backend')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in backend object*/
            this.backend[name] = require(path.resolve(`./app/controllers/backend/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['backend'][name] = new this.backend[name]();
        });
    }//loadAdminClasses
    unlessRoutes(){
        this.router.use(expressJWT({ 
            secret: new Buffer(config.secretKey).toString('base64')  
        }).unless({
            path :[
                  "/admin_api/login-admin"
            ]
        }));

    }//unlessRoutes

    loadAdminRoutes(){
        //adminLogin route
        this.router.post('/login-admin',this.call['backend']['AdminController'].login);
        //dashbord route
        // this.router.get('/dashbord-admin',this.call['backend']['AdminController'].dashbord)

    }//loadAdminRoutes

    init(){
        this.loadAdminClasses();
        this.unlessRoutes();
        this.loadAdminRoutes();

        return this.router;

    }
}//AppRouter

module.exports=AppRouter