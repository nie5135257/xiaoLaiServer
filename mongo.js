let mongo = require('mongoose')
mongo.connect('mongodb://127.0.0.1/xiaolai',{useNewUrlParser: true})
mongo.connection.on('connected',err=>{
	console.log('数据库连接成功')
})

let Header = mongo.Schema({
	name: String,
	arr: Array
})

let arr = mongo.model('arr',Header)


let Header2 = mongo.Schema({
	id: String,
	pwd: String,
	movie: Array
})

let user = mongo.model('user',Header2)


let Header1 = mongo.Schema({
	name: String,
	address: String,
	
	src: String,
	srcbgx: String,
	srcbgy: String,
	srcbg1: String,
	
	price: String,
	grade: String,
	
	v: String,
	v1: String,
	
	txt: String,
	txt1: String,
	txt2: String,
	
	time: String,
	begin: String
})

let index = mongo.model('index',Header1)


module.exports = { user, index, arr}




