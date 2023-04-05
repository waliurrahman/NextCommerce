import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fname: { type: String },
    lname: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

let User;

try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', userSchema);
}

export { User };
