import { compare, hash } from 'bcrypt';
const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const isMatch = await compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

export {hashPassword, comparePassword}