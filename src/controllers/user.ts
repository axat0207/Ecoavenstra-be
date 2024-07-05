import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"; // Ensure you're importing types for Express
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { transporter } from "../utils/mailTransport.js";

const prisma = new PrismaClient();

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  EMPLOYER = "EMPLOYER",
}
interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export const Signup = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { name, email, password, role }: User = req.body;
    // Check if the user already exists
    const isUserExist = await prisma.user.findFirst({
      where: { email },
    });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        role: role as Role,
        name,
        email,
        password: hashPassword,
      },
    });

    // Send a success response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
}

export const getUserDashboard = (req: Request, res: Response) => {
    res.send("User Dashboard");
}


const otpStore: { [key: string]: { otp: number; expiresAt: number } } = {};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { mail } = req.body;
    const genOtp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

    if (!mail) {
      return res.status(400).send("Recipient email is required.");
    }

    // Store OTP and expiration time (1 minute)
    const expiresAt = Date.now() + 60 * 1000;
    otpStore[mail] = { otp: genOtp, expiresAt };

    const mailOptions = {
      from: process.env.EMAIL_FROM || "axxatagrawal@gmail.com",
      to: mail,
      subject: "Forget Password EcoValley",
      text: `Your OTP is ${genOtp}. Please verify it within a minute or it will be reset!`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { mail, otp } = req.body;

    if (!mail || !otp) {
      return res.status(400).send("Email and OTP are required.");
    }

    const storedOtpData = otpStore[mail];

    if (!storedOtpData) {
      return res.status(400).json({ success: false, message: "OTP not found." });
    }

    const { otp: storedOtp, expiresAt } = storedOtpData;

    if (Date.now() > expiresAt) {
      delete otpStore[mail];
      return res.status(400).json({ success: false, message: "OTP has expired." });
    }

    if (parseInt(otp) !== storedOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // OTP is valid
    delete otpStore[mail];
    res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
