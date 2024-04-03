import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (enteredPassword) {
    console.log(`entered Password: ${enteredPassword}`);
    console.log("this.password: ", this.password);
    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      this.password
    );

    console.log("isPasswordValid: ", isPasswordValid);

    if (isPasswordValid) {
      return true;
    } else {
      return false;
    }
  }

  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
