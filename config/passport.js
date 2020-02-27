// const LocalStrategy = require('passport-local').Strategy;
// const Customer = require('../model/customer');
// const config       = require('../config/database')
// const bcrypt       = require('bcryptjs')


// module.exports = function(passport) {
//     passport.use(new LocalStrategy(function(email , password , done){
// let query = {username:username};
// Customer.findOne(query , function(err , user){
//     if(err) throw err;
//     if(!user){
//         return done(null , false , {messsage : 'No user found'});
//     }

//     bcrypt.compare(password , user.password , function(err , isMatch){
//         if(err) throw err;
//         if(isMatch){
//             return done(null , user);
//         }else {
//             return done(null , false , {messsage : 'Wrong password'});
//         }
//     });
// });
//     }));

//     passport.serializeUser(function(user , done){
//         done(null , user.id);
//     });
//     passport.deserializeUser(function(id , done){
//         Customer.fingById(id , function(err , user){
//             done(err , user)
//         })
//     })
// } 