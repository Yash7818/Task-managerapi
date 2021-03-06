const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userschema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		trim : true
	},
	email : {
		type : String,
		unique : true,
		dropDups : true,
		required : true,
		trim : true,
		lowercase : true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email is invalid')
			}
		}
	},
	password : {
		type : String,
		trim : true,
		minlength : 7,
		required : true,
		validate(value){
			if(value.toLowerCase().includes("password")){
				throw new Error('the password should not contain word password')
			}
		}
	},
	age : {
		type : Number,
		default : 0,
		validate(value) {
			if(value<0){
				throw new Error('age must be a +ve no.')
			}
		}
	},
	tokens: [{
		token:{
			type :String,
			required : true
		}
	}],
	avatar:{
		type:Buffer
	}

},{
	timestamps : true
})

userschema.virtual('tasks',{
	ref : 'task',
	localField : '_id',
	foreignField : 'owner'
})

userschema.methods.toJSON =  function (){
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar

	return userObject

}
userschema.methods.generateAuthToken = async function (){
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}


userschema.statics.findByCredentials = async (email,password) =>{
	const user = await User.findOne({email})

	if(!user){
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password,user.password)

	if(!isMatch){
		throw new Error('Unable to login')
	}

	return user

}
//hash plain text password
userschema.pre('save', async function (next){
	const user =this

	console.log('saving')
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password,8)
	}
	next()
})

//delete user tasks when user deleted themselves

userschema.pre('remove', async function(next){
	const user = this
	await Task.deleteMany({ owner : user._id })

	next()
})


const User = mongoose.model('User',userschema)

module.exports = User