const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const Userrouter = require('./routers/users')
const Taskrouter = require('./routers/tasks')

const app = express()

const port = process.env.PORT

// app.use((req,res,next) =>{
// 	if(req.method ==='GET'){
// 		res.send('GET requests are disabled')
// 	}else{
// 		next()
// 	}
// })

// app.use((req,res,next) =>{
// 		res.status(503).send('Site is under maintenance , please tune shortly')
// })



	

app.use(express.json())
app.use(Userrouter)
app.use(Taskrouter)


app.listen(port,()=>{
	console.log('server started at port '+port)
})


// const Task = require('./models/task')

// const main = async () =>{
// // const task = await Task.findById('5eff8879d8bcc94b84f889db')
// // await task.populate('owner').execPopulate()
// // console.log(task.owner)
// const user = await User.findById('5eff8712737f963d64716053')
// await user.populate('tasks').execPopulate()
// console.log(user.tasks)
// }
// main()
// const router = new express.Router()

// app.post('/users',async (req,res)=>{
// 	const user = new User(req.body)

// 	try{
// 		await user.save()
// 		res.status(201).send(user)

// 	}catch(e){
// 		res.status(400).send(e)
// 	}
	

	// user.save().then(() => {
	// 	res.status(201).send(user)

	// }).catch((e) => {
	// 	res.status(400).send(e)

	// })

// })





