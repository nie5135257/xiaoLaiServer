let Koa = require('koa')
let server = new Koa()

let {user,index,arr} = require('./mongo')

let static1 = require("koa-static")
server.use(static1("./src"))

let cors = require('koa2-cors')
server.use(cors())

let body = require('koa-body')
server.use(body())

let Router = require("koa-router")
let router = new Router()

router.post('/reg',async (ctx,next)=>{
	let res = ctx.request.body 
	let one = new user(res)
	await one.save()
	ctx.body = '注册成功'
})

router.post('/arr',async (ctx,next)=>{
	if(ctx.query.name){
		let data = ctx.request.body
		arr.updateOne({name: ctx.query.name},{
			arr: data
		},err=>{
			console.log("更新成功")
		})
		ctx.body = true
	}else{
		let data = ctx.request.body
		ctx.body = await arr.findOne(data)
	}
	
})



router.get('/data',async (ctx,next)=>{
	if(ctx.query.id){
		ctx.body = await index.findOne({_id: ctx.query.id})
	}else{
		ctx.body = await index.find()
	}
})

router.post('/login',async (ctx,next)=>{
	if(ctx.query.reg){
		let name = ctx.request.body
		let res = await user.findOne(name)
		if(res){
			ctx.body = 'true'
		}else{
			ctx.body = 'false'
		}
	}else if(ctx.query.name){
		let data = ctx.request.body
		user.updateOne({id: ctx.query.name},data,err=>{
			console.log('ok')
		})
		ctx.body = true
	}else if(ctx.query.data){
		let data = ctx.request.body 
		ctx.body = await user.findOne(data)
	}else{
		let data = ctx.request.body 
		let res = await user.findOne(data)
		if(res){
			ctx.body = 'true'
		}else{
			ctx.body = 'false'
		}
	}
})

server.use(router.routes())

server.listen(3000,err=>{
	console.log('3000端口号启动成功')
})
