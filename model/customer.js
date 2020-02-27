
const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const CustomerSchema = new Schema({
    firstName : {type : String, required: true}, 
    lastName : {type : String, required: true},
	email : {type : String, required: true} , 
	password : {type : String, required: true} ,
	createdOn : {type : Date , default : Date.now()}
})

CustomerSchema.virtual('user').get(function() {
	return `/${this.firstName}`
})

module.exports = mongoose.model('Customer' , CustomerSchema)
