import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM || 'axxatagrawal@gmail.com',
    pass: process.env.EMAIL_AUTH_PASSWORD || 'mfxu rydb iemf vwnq', // or App Password if 2FA is enabled
  },
});