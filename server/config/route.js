var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
// var Comment = require('../app/controllers/comment');
// var Category = require('../app/controllers/category');

module.exports = function (app) {
        // pre handle user
        app.use(function (req, res, next) {
            var _user = req.session.user;
            if(_user){
                app.locals.user = _user;
            }
            return next();
        })

        // Index
        app.get('/', Index.index);

        // User
        app.post('/user/signup', User.signup);
        app.post('/user/signin', User.signin);  
        app.get('/user/logout', User.logout);
              
}