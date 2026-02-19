import { pass, userName } from "../constants/loginConstants.ts";

export const loginService = async (data: any) => {
  try {
    const { emailId, password } = data.body;

    if (!emailId || !password) throw "Email Id and Password are neccessary";

    if (emailId === userName && password === pass) return true;
    else return false;
  } catch (error) {
    throw error;
  }
};
