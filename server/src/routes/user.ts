import mongoose from 'mongoose';
import express from 'express';
import userModel from '../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../auth/auth';
const router = express.Router();

router.post('/signup', async (req, res) => {
  const user = await userModel.find({ email: req.body.signupEmail });
  if (user.length == 0) {
    bcrypt.hash(req.body.signupPassword, 10, async (err, hash) => {
      try {
        if (!err) {
          const user = new userModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            height: req.body.height,
            phoneNum: req.body.phoneNum,
            email: req.body.signupEmail,
            password: hash
          });
          const createdUser = await user.save();
          const token: string = await jwt.sign({ email: createdUser.email, userid: createdUser._id }, process.env.JWT_TOKEN!, {
            expiresIn: '24h',
          });
          res.status(201).json({error: null , data:{userData:createdUser,token:token}});
        } else {
          res.status(500).json({error: "Password hashing error", data:null});
        }
      } catch (err) {
        res.status(500).json({error: err.message, data:null});
      }
    });
  } else {
    res.status(404).json({error: "This email already exists", data:null});
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.loginEmail });
    if (user === null) res.status(404).json({ error: `No user found with this email id ${req.body.loginEmail}`, data:null });
    else {
      bcrypt.compare(req.body.loginPassword, user.password, (err, pass) => {
        if (err || pass == false) {
          res.status(404).json({ error: "Incorrect password", data:null });
        } else {
          const token: string = jwt.sign({ email: user.email, userid: user._id }, process.env.JWT_TOKEN!, {
            expiresIn: '72h',
          });
          res.status(201).json({error: null , data:{userData:user,token:token}});
        }
      });
    }
  } catch (err) {
    res.status(500).json({error: err.message, data:null});
  }
});

router.patch('/editprofile/:userid', auth , async (req, res) => {
  try {
    const updatedUser: any = {};
    for (let item of req.body) {
      updatedUser[item.method] = item.value;
    }
    const updatedValue = await userModel.updateOne({ _id: req.params.userid }, { $set: updatedUser });
    if(updatedValue.n === 1) res.status(201).json({error: null, data: {userData:updatedValue}});
    else res.status(500).json({error: 'User data not updated', data:null});
  } catch (err) {
    res.status(500).json({error: err.message, data:null});
  }
});


export default module.exports = router;
