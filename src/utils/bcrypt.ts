import bcrypt from 'bcrypt'

const generateBcrypt = async (key: string) => {
  
  const salt = await bcrypt.genSalt(8)

  const hash = await bcrypt.hash(key, salt)

  return hash
}

const compareBcrypt = async (pass: string, thisPass: string) => {
  
  const response = await bcrypt.compare(pass, thisPass)

  return response
}

export { generateBcrypt, compareBcrypt }