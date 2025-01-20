import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { queueService } from "../Services/queueManagement.js"
import { startWorker } from "../Services/requestWorker.js";

export const signup = async (req,res)=>{
  try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
      return res.status(201).json({
        success:false,
        message:"Invalid/incomplete user details"
       });
    }
   const hashedPassword = await bcrypt.hash(password,10);
     const user  = new User({name,email,password:hashedPassword});
     await user.save();
     return res.status(201).json({
      success:true,
      message:"User Created Successfully"
     });
  } catch (error) {
    console.log('error',error);
    return res.status(500).json({
      success:false,
      message:"Error in creating user",error
     });
  }
  
 

}

export const login = async (req,res)=>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid email or password.'
      });
    }
    let isMatch = await bcrypt.compare(password,user.password);

 
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid email or password.'
      });
    }
    

    const token = jwt.sign(
      { email: user.email, id: user._id},
      'abc', 
      { expiresIn: '1h' }
    );

    return res.status(200).send({
      success: true,
      message: 'Login successful.',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal server error.'
    });
  }
}


export const enqueueTask = async (req,res)=>{
  try {
   const userId = req.params;
   
   const {data} = req.body;
   console.log(data);
   await queueService(userId,data);
   await startWorker(userId);
   return res.status(200).json({message:"Request enqueued"});
  } catch (error) {
   return res.status(500).json({error:"Failed to enqueue request"+error})
  }
}