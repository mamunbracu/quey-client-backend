

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')


//@route   post api/users
//@desc    register user
//@access   public

const registerUser = async (req) => {
  const { name, email, password } = req.body
  try {
    const existUser = await User.find({email})
    if(existUser) {
      return {
        failed: true,
      status: 400,
      msg: error.message || "User Already exist"
      }
    }
    const user = await User.create({
      name,
      email,
      password,
    })
  

     return{
        user,
      }
    
  } catch (error) {
    return {
      failed: true,
      status: 400,
      msg: error.message || "User creation failed"
  }
  }

  
}


//@ authenticate user and get token
// route  POST /api/users/login
//@access Public
const login = async (req) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return {
          failed: true,
          status: 404,
          msg: "No User found with this email address"
      }
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return {
        failed: true,
        status: 401,
        msg: "incorrect password."
    }
};
    // if (user && (await user.matchPassword(password))) {
      return {
        msg:"user login successfully",
        user,
        status:200,
        token: generateToken(user._id),
      }
   
    // }
  
    
  } catch (error) {
    return {
      failed: true,
      status: 400,
      msg:'invalid Email or password'
    }
  }

 
}

module.exports = {registerUser, login}