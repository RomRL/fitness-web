import  express  from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcryptjs";
const router = express.Router();   //Create Router
import {validateToken} from './validate.js';

//Register
router.post('/register', async (req, res) => {
  try {


    const { email,password,firstName,lastName,height,weight } = req.body;
    const user= await UserModel.findOne({email } );
    if (user){return res.status(400).json({messege: "The email already exists"});}
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const bmi = BMICalculation(weight,height);
    const newUser = new UserModel({email,password:hashedPassword,firstName,lastName,height,weight,bmi});
      await newUser.save();
      console.log("User saved successfully");
      res.status(200).json({messege : "User registerd successfully"});

  } catch (error) {
      res.status(500).json({ messege: "Server Error" });

      console.error("Error saving user:", error);
    }

});   
//Login
router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    try {
      
        const user = await UserModel.findOne({ email });
    
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
    
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect password" });
        }
        // The token contains information about the user's identity.
        const token =jwt.sign({ id: user._id }, config.encrypt);
        res.status(200).json({token  ,userID: user._id ,message: "logged in successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
});

//get user by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    user.password = "";
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

});
//update user
router.put('/update/:id', async (req, res) => {
  const userID = req.params.id;
  const { email,password,firstName,lastName,height,weight } = req.body;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const bmi = BMICalculation(weight,height);

    const newUser = new UserModel({email,password:hashedPassword,firstName,lastName,height,weight,bmi});
    await newUser.save();
    console.log("User saved successfully");
    res.status(200).json({messege : "User updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


//update user height
router.put('/updateHeight/:id', async (req, res) => {
  
  const userID = req.params.id;
  const { height } = req.body;
  try {
    const user = await UserModel.updateOne({_id:userID},{height:height},{bmi:BMICalculation(user.weight,height)});
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({messege : "User height updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

    
});

export function BMICalculation(weight, height) {
  // Convert height to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  // Return BMI rounded to two decimal places
  return bmi.toFixed(2);
}
export{ router as usersRouter}
