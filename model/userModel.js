import mongoose from "mongoose";
import {} from 'dotenv/config';

// const uri =
//   "mongodb+srv://dollypatel280501:diMBr4zJtUPzJFlh@cluster0.n1povoz.mongodb.net/CostcoUsers?retryWrites=true&w=majority";

const uri = process.env.MONGO_URI


  mongoose.connect(uri).then(()=> console.log("Connected to MongoDB!!"))
  .catch((err)=>{
    console.log(`Not Connected due to error below ######\n${err}`)
  })

  const userSchema = mongoose.Schema({
    name:{type: String,required: true},
    email:{type: String,required: true},
    pwd:{type: String,required: true},
  })

  const userModel = mongoose.model('User', userSchema)

  export default userModel