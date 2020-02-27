const Article = require('../model/article')
const Customer = require('../model/customer')

class App {
    constructor() {
		this.name = "minQuora - Base for informative topics"
	}
	description(){
		return {
			name : this.name , 
			developer : this.developer 
		}
	}
	/**
	  * Controls get request to the home page 
	*/
	getIndex = (req , res ) => {
        Article.find({} , function(err , articles) {
            if(err){
                console.log(err)
            }else{
                res.render('index' , { 
                    title  : 'Articles',
                    articles : articles})
            }
        })
		
    }
    
	getArticle = async (req , res , next) => {
		res.render('article' , { title  : this.description().name })
	}
	
    getAdd = (req , res , next) => {
        if(req.session.email){
            res.render('add_article' , { title  : "Add an article" })
        }else{
            res.send("You can't access this page")
        }
		
    }
    
	postAdd = async (req , res) => {
        if(req.session.email){
            let user = await Customer.findOne({email : req.session.email})
            if(user){
                let article = new Article();
        
                article.title = req.body.title;
                article.author = user._id;
                article.body = req.body.body;
        
                article.save(function(err) {
                 if(err){
                    console.log(err);
                    return;
                 }else{
                     req.flash('success' , 'Your article has been added successfully!!!')
                     res.redirect('/dashboard')
                 }   
                })
            }
            
            }
            
    }
    getSingleArticle = async (req , res , next) => {
        if(req.session.email){
            let article = await Article.findOne({title : req.params.article})
            if(article){
                let user = await Customer.findOne({_id : article.author})
                res.render('article' , { article : article, user : user})
            }
            }else{
                res.send('Article not edited')
        }
        
	}
    getEditArticle = async (req , res , next) => {
        if(req.session.email){
            let article = await Article.findOne({title : req.params.single})
            if(article){
                let user = await Customer.findOne({_id : article.author})
                res.render('edit_article' , { article : article, user : user})
            }
            
        }else{
            res.send("nNo user")
        }
        
    }
    postEditArticle = async (req , res) => {
        if(req.session.email){
            let article = await Article.findOne({title : req.params.single})
            let articleID = article._id
            Article.findByIdAndUpdate(articleID, {
                body : req.body.body
            }, {new : true, useAndModify : false}, (err , item) => {
                if(err){
                  res.status(500)
                  return
                }else {
                    req.flash('success' , 'Article Updated')
             res.redirect('/dashboard')
                }
                })
        }else{
            res.send("No user")
        }  
        
    }
    getDeleteArticle = async (req , res) => {
        if(req.session.email){
            let article = await Article.findOne({title : req.params.single})
            let articleID = article._id
            let query = {_id: articleID}
            
            Article.remove(query , function(err){
                if(err){
                    console.log(err)
                }
                req.flash('danger' , 'Your article has been deleted')
                res.redirect('/dashboard')
            })
        }else{
            res.send("You can not delete")
        }
        
    }
}

const returnApp = new App()

module.exports = returnApp 