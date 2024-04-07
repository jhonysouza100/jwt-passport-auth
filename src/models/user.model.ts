import { model, Schema } from 'mongoose'
import { User } from '../interfaces/user.interface'
import { generateBcrypt, compareBcrypt } from '../utils/bcrypt'


const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// encrypt the password
userSchema.pre('save', async function(next) {
  
  const user = this

  if(!user.isModified('password')) return next()

  const encryptedPass = await generateBcrypt(user.password)

  user.password = encryptedPass

  next()

})

// decode the password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {

  return await compareBcrypt(password, this.password)

}

export default model('usersPass', userSchema)