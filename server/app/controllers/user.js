var User = require('../models/user');

// signup
exports.signup = function (req, res) {
    console.log(req.body)
    var _user = req.body.user;
    User.findOne({ name: _user.name }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            res.json({
                success: false,
                message: '用户名已注册'
            })
            // return res.redirect('/signin')
        } else {
            var user = new User(_user);

            user.save(function (err, user) {
                if (err) {
                    console.log(err)
                }
                // res.redirect('/signin')
                res.json({
                    data: [],
                    success: true,
                    message: "注册成功"                    
                });
            })
        }
    })
}

// signin
exports.signin =  function (req, res) {
    console.log(req.body)    
    var _user = req.body.user;
    User.findOne({
        name: _user.name
    }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (!user) {
            res.json({
                success: false,
                message:'没有此用户'
            })
            // return res.redirect('/signup')
        }
        user.comparePassword(_user.password, function (err, isMatch) {
            if (err) {
                console.log(err)
            }
            if (isMatch) {
                req.session.user = user;
                res.json({
                    success: true,
                    message: '登录成功',
                    data: user
                })
                // return res.redirect('/')
            } else {
                res.json({
                    success: false,
                    message: '密码错误'
                })
                // return res.redirect('/signin')
            }
        })
    })
}

// logout
exports.logout = function (req, res) {
    delete req.session.user
    res.redirect('/')
}

// userlist page
exports.list =  function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err)
        }
        res.render('userlist', {
            title: '用户列表页',
            users: users
        })
    })
}

// middleware for user
exports.signinRequired = function (req, res,next) {
    var user = req.session.user;
    if(!user){
        res.redirect('/signin')
    }
    next()
}

exports.adminRequired = function (req,res,next){
    var user = req.session.user;
    if (user.role === 'undefined' || user.role <= 50){
        res.redirect('/signin')
    }
    next()    
}