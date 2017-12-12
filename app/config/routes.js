const   expressJWT      =   require('express-jwt'),
        fs              =   require("fs"),
        path            =   require("path"),
        config          =   require(path.resolve("./app/config/config"));

        console.log(config);


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
            console.log(name);
            this.call['backend'][name] = new this.backend[name]();
        });
    }//loadAdminClasses
    unlessRoutes(){
        this.router.use(expressJWT({ 
            secret: config.secretKey
        }).unless({
            path :[
                  "/admin_api/login-admin"
            ]
        }));

    }//unlessRoutes

    loadAdminRoutes(){
        //adminLogin route
         this.router.post('/login-admin',this.call['backend']['AdminController'].login);
        //add Blog route
         this.router.post('/addBlog-admin',this.call['backend']['AdminController'].addBlog);
        //getBlogs route
         this.router.get('/getBlogs-admin',this.call['backend']['AdminController'].getBlogs);
         //getBlogs route
         this.router.get('/getABlog-admin',this.call['backend']['AdminController'].getABlog);
        //getBlogs route
         this.router.put('/editBlog-admin',this.call['backend']['AdminController'].editBlog);
        //getBlogs route
         this.router.put('/deleteBlog-admin',this.call['backend']['AdminController'].deleteBlog) 
        
    }//loadAdminRoutes

    init(){
        this.loadAdminClasses();
        this.unlessRoutes();
        this.loadAdminRoutes();

        return this.router;

    }
}//AppRouter

module.exports=AppRouter