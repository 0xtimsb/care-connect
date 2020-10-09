import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: mongoose.Schema.Types.String, required: true },
  age: { type: mongoose.Schema.Types.Number, required: true },
  dob: { type: mongoose.Schema.Types.Date, required: true },
  weight:{type: mongoose.Schema.Types.Number, required:true},
  height:{type: mongoose.Schema.Types.Number, required:true},
  phoneNum: {
    type:mongoose.Schema.Types.String,
    required:true, 
    match: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/},
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  },
  password: { type: mongoose.Schema.Types.String, required: true },
});

interface USER extends mongoose.Document {
  _id: string;
  name:string,
  age: number,
  dob: string
  weight: number
  height: number
  phoneNum:string
  email: string;
  password: string;
}
userSchema.pre('updateOne', async function(next) {
  try{
    const email = this.getUpdate().$set.email
    if(email != undefined){
      const reg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      const result =  reg.test(email)
      if(!result) return next(new Error('Incorrent email id'))
      else next()
    }
    else next()
  }
  catch(err){
    return next(err)
  }
})
const userModel = mongoose.model<USER>('users', userSchema);

export default module.exports = userModel;
