import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const META_PASSWORD = process.env.META_PASSWORD;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "valeriiaskl@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "valeriiaskl@meta.ua" };
  await transport.sendMail(email);
  return true;
};

export default sendEmail;
