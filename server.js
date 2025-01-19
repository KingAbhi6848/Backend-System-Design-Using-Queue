import express from 'express';
import db from './Config/mongoose.config.js';
import userRoute from './src/Routes/user.route.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoute);

app.listen(port,(err)=>{
  if(err){
    console.error('❌ server failed to start on port',port);
  }
  console.log("✅ Server Started Successfully on Port",port);
})