let mongoose =  require('mongoose');
const Schema   = mongoose.Schema 
//Article Schema
let articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref : 'customer'
  },
  body: {
    type: String,
    required: true
  },
});

articleSchema.virtual('article').get(function() {
	return `/articles/${this.title}`
})

articleSchema.virtual('single').get(function() {
	return `/${this.title}`
})


module.exports = mongoose.model('Article' , articleSchema);
