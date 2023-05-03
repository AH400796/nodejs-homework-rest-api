const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegepx = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const subLevel = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    subscription: {
      type: String,
      enum: subLevel,
      default: "starter",
    },
    email: {
      type: String,
      match: emailRegepx,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: [true, "Set avatar for user"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  subscription: Joi.string().valid(...subLevel),
  email: Joi.string().pattern(emailRegepx).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegepx).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegepx).required(),
  password: Joi.string().min(6).required(),
});

const updateSubSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subLevel)
    .required(),
});

const authSchemas = { registerSchema, loginSchema, updateSubSchema, emailSchema };

const User = model("user", userSchema);

module.exports = { authSchemas, User };
