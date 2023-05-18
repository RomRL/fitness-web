import  express  from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcryptjs";
const router = express.Router();   //Create Router
//Register
router.post('/register', async (req, res) => {
  try {
    const { email,password,firstName,lastName,height,weight } = req.body;
    const user= await UserModel.findOne({email } );
    if (user){return res.status(400).json({msg: "The email already exists"});}
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const bmi = BMICalculation(weight,height);
  const newUser = new UserModel({email,password:hashedPassword,firstName,lastName,height,weight,bmi});
      await newUser.save();
      console.log("User saved successfully");
      res.json({messege : "User registerd successfully"});

    } catch (error) {
      console.error("Error saving user:", error);
    }

});   
//Login
router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    try {
        console.log("email:",email,"password:",password)
        const user = await UserModel.findOne({ email });
    
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
    
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect password" });
        }
        // The token contains information about the user's identity.
        const token =jwt.sign({ id: user._id }, "secret");
        res.status(200).json({token,UserID: user._id, message: "logged in successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
});

function BMICalculation(weight, height) {
  // Convert height to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  // Return BMI rounded to two decimal places
  return bmi.toFixed(2);
}
export{ router as usersRouter}