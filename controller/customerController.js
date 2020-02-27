const Customer = require('../model/customer')
const Article = require('../model/article')
const {check ,query , sanitizeParams , sanitizeQuery ,  validationResult } = require('express-validator') 
const {sanitizeBody }  = require('express-validator')
const bcrypt           = require('bcryptjs')
const nodemailer       = require('nodemailer')
const fs               = require('fs')
const path             = require('path')


class App {
    
    getSignUp = (req , res , next) => {
		res.render('signup' , { title  : "Register for free"})
    }

    postSignup = [
        check('email').not().isEmpty().isEmail().normalizeEmail().trim()
        .withMessage('Please , provide a valid email ')
        .custom(value => {
            return Customer.findOne({'email' : value}).then(user => {
              if (user ) {
                return Promise.reject('E-mail already in use')	
              }
            })
        }), 
        sanitizeBody('*').escape() ,  
        async (req , res , next) => { 
          const errors = validationResult(req)
          if (!errors.isEmpty()) { 
            res.render('signup' , {errors : errors.array()}) 
            return
          }else {
    
            try {	
              const {first_name , last_name, email , password}  = req.body 
              let customerPass = await bcrypt.hash(password , 10)
              let customer = new Customer({
                firstName : first_name,  
                lastName : last_name,
                email : email ,  
                password : customerPass 
              })
              let ret = await customer.save()
              if ( ret ) {
                  req.flash('success' , 'You are now registered and can log in')
                  res.redirect(303, 'login')
              }else {
                throw {
                  name : "Error",
                  message: "Something is wrong somewhere"
                }
              }
          }catch(error) {
            res.status(500).json(error.message)
            return
          }
        }
      }] 

    getLogin = (req , res , next) => {
		res.render('login' , { title  : "Login"})
    }

    postLogin = [
        sanitizeBody('*').escape() , 
        async (req , res , next) => {
            try { 
                let customer = await Customer.findOne({email : req.body.email})
                if(customer){
                    let validUser = await bcrypt.compare(req.body.password , customer.password)
                    if (validUser) {
                        req.session.email = customer.email 
                        res.redirect(303, '/dashboard')
                    }else {
                        res.render('login' , { error : 'Invalid Login details'})
                    }
                }else {
                    res.render('login' , { error : 'Invalid Login details'})
                }
            }catch(errors) {
                res.render('login' , {error : errors})
            }
        }
    ]

    // getDashboard = async (req , res , next ) => {
    //     if (req.session.email ) {
    //         try {
    //             let customer = req.params.customer
    //             let validCustomer = await Customer.findOne({email : customer})
    //             if (validCustomer) {
    //                 res.render("dashboard" , {user : validCustomer})
    //             }else{
    //                 throw new Error("Invalid user")
    //                 return
    //             }
    //         }catch(error) {
    //             res.redirect(303  , '/login')
    //             return
    //         }
    //     }else {
    //         res.redirect(303 , '/login')
    //         return 
    //     }
    // }

    getDashboard = async (req , res , next) => {
      if(req.session.email){
        req.flash('primary' , 'Welcome to your dashboard')
        let user = await Customer.findOne({email : req.session.email})
        if (user){
          let article = await Article.find({author : user._id})
          if(article){
            res.render('dashboard' , { title  : "Register for free", articles : article})
          }else{
            res.render('dashboard' , { title  : "Register for free", message : "No articles yet"})
          }
          
        }else{
          res.send("No user")
        }
        
      }
      else{
        res.send("I think you need to be logged in first")
      }
    }

    getLogout = (req , res , next ) => {
		try {
			if (req.session.email) {
          delete req.session.email
                req.flash('danger' , 'You\'re logged out successfully, see you soon!!!') 
                res.redirect(303 , '/login')
			}else {
				throw new Error("Problem signing out. We will handle this shortly")
			}
		}catch(error) {
			res.status(400).send(error)
		}
    }

    
}

const returnApp = new App()

module.exports = returnApp 