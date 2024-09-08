import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
// import twilio from "twilio"
import otpGenerator from "otp-generator"
import Otp from "../models/otp.model.js"


export const register = async (req,res) => {
    try {
        const hashPassword = bcrypt.hashSync(req.body.password,10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password : hashPassword
        })
        await newUser.save()
        const {password , ...info} = newUser._doc
        res.status(200).json({
            message : "User created successfully",
            data : info
        })
    }catch(err) {
        res.status(500).json({
            message : "User creation failed",
            error : err
        })
        console.log(err)
    }
}

export const login = async (req,res) => {
    try {

        const user = await User.findOne({email : req.body.email});
        if(!user) {
            return res.status(404).json({
                message : "Email does not exist"
            })
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassword) {
            return res.status(404).json({
                message : "Email or Password is Incorrect"
            })
        }

        const token = jwt.sign({
            userId : user._id,
            isAdmin : user.isAdmin
        } , process.env.JWT_KEY)

        const {password , ...info} = user._doc

        res.status(200).json({
            message : "User is logged in",
            data : {...info , token}
        })
    }catch(err) {
        res.status(500).json({
            message : "Login Failed",
            error : err
        })
        console.log(err)
    }
}

// const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
// const twilioAccountAuthToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN

// const twilioClient = new twilio(twilioAccountSid , twilioAccountAuthToken)


export const sendOtp = async (req,res) => {
    try {

        const { phone } = req.body;

        if(!phone) {
            return res.status(400).json({
                message : "Something wrong with phone number"
            })
        }

        const otp = otpGenerator.generate(4 , {
            upperCaseAlphabets :false,
            specialChars : false,
            lowerCaseAlphabets : false,
        })

        const currentDate = new Date();

        await User.findOneAndUpdate(
            { phone },
            {
                otp,
                otpExpires : new Date(currentDate.getTime())
            },
            {
                upsert : true,
                new : true,
                setDefaultsOnInsert : true,
            }
        )

        // await twilioClient.messages.create({
        //     body : `Your OTP is ${otp}`,
        //     to : phone,
        //     from : process.env.TWILIO_ACCOUNT_PHONE_NUMBER
        // })

        res.status(200).json({
            message : "OTP has been send successfully",
            data : otp
        })

    }catch(err) {
        res.status(500).json({
            message : "Sending OTP Failed",
            error : err
        })
    }
}

const checkOtpExpiration = async (otpTime) => {
    try {
        const currentDate = new Date()
        const currentTimeMilliseconds = currentDate.getTime()

        let timeDifference = (currentTimeMilliseconds - otpTime)/1000
        timeDifference /= 60

        const minutes = Math.abs(timeDifference)

        if(minutes > 5) {
            return true
        }

        return false

    }catch(err) {
        console.log(err)
    }
}

export const verifyOtp = async (req,res) => {
    try {
        const {phone , otp} = req.body;

        const otpData = await User.findOne({
            phone,
            otp
        })

        if(!otpData) {
            return res.status(400).json({
                message : "OTP is incorrect"
            })
        }

        const isOtpExpired = await checkOtpExpiration(otpData.otpExpires)

        if(isOtpExpired) {
            return res.status(400).json({
                message : "OTP has been expired"
            })
        }


        const token = jwt.sign({
            userId : otpData._id,
            isAdmin : otpData.isAdmin
        } , process.env.JWT_KEY)

        const {password , ...info} = otpData._doc

        res.status(200).json({
            message : "OTP is correct",
            data : { ...info , token}
        })

    }catch(err) {
        res.status(500).json({
            message : "OTP Verification Failed",
            error : err
        })
    }
}