/** 
 * Configuration file for the application 
*/

const MONGODB_CONFIG = {
    URL : 	"mongodb+srv://staunchCFO:emeka1234@cluster0-keat9.mongodb.net/minquora?retryWrites=true&w=majority" , 	
    OPTIONS : {
	useNewUrlParser : true , 
	useCreateIndex : true , 
	poolSize : 10 , 
	keepAlive : true , 
	useUnifiedTopology : true , 
	keepAliveInitialDelay : 300000
	}
}
module.exports = MONGODB_CONFIG