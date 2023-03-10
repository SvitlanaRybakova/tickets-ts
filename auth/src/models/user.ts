import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties that are requried to creat a new User
interface IUserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}

// An interface that describes the properties that a User Document has
interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attr: IUserAttrs) => {
  return new User(attr);
};
const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);
export { User };
