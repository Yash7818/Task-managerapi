const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser : true,
	useCreateIndex : true,
	useFindAndModify : false,
	useUnifiedTopology : true
})



// const my = new User({
// 	name : '   yashasvimm',
// 	email : 'yas@gmail.com ',
// 	password : 'Pass231@#'
// })

// const daily = new task({
// 	description : '    videocall  ',
// 	completed : true
// })

// daily.save().then((result) =>{
// 	console.log(result)
// }).catch((error) => {
// 	console.log('error',error)
// })

// my.save().then((result)=>{
// 	console.log(result)
// }).catch((error)=>{
// 	console.log('error',error)
// })