import mongoose from "mongoose";
import { authenticationService } from "common";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
  ]
});

userSchema.pre('save', async function(done){
  if(this.isModified('password')|| this.isNew){
    const hashedPwd = authenticationService.pwdToHash(this.get('password'));
    this.set('password, hashed')
  }
  done()
});

const User = mongoose.model("User", userSchema);
export default User;
