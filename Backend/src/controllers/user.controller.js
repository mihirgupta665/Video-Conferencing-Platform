import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt, {hash} from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {

    const { username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message : "Please Provide valid details"});
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "Username does not exists in Database"});
        }

        if(bcrypt.compare(password, user.password)){    // can't equate directly as it gives different hashed value each time
            let token = crypto.randomBytes(20).toString("hex");
            user.toker = token;
            await user.save();
            return res.status(httpStatus.OK).json({token : token});
        }   


    }  
    catch(err){
        return res.status(500).json({message: "Something went wrong!"});
    }

}

const register = async (req, res) => {
    const {name, username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if(existingUser){       // early retur technique
            return res.status(httpStatus.FOUND).json({message:" Username Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newuser.save();

        res.status(httpStatus.CREATED).json({message : "User Registered"});

    }
    catch(err){
        res.json({message : `Something Went Wrong ${err}`});

    }

}

export {login, register};