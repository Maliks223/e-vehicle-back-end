const { Schema, model } = import("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [20, "Too long, max is 32 characters"],
    required: [true, "Name is Required!"],
  },
  email: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    unique: true,
    lowercase: true,
    required: [true, "Email is Required!"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    min: [8, "Too short, min is 8 characters"],
    max: [32, "Too long, max is 32 characters"],
    required: [true, "Password is Required!"],
  },
  isAdmin: {
    type: Boolean
  },
  
},{timestamps: true} );

const User = model("users", UserSchema);

export{User};
