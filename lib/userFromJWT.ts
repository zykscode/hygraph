import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import { envVariables } from "./jwt";
import { User } from "@prisma/client";



const { JWT_KEY } = envVariables;

const verifyJWTandCheckUser = async (token: string): Promise<[string | null, User | null]> => {
  let error: string | null = null;
  let user: User | null = null;

  try {
    const data = jwt.verify(token, JWT_KEY);

    if (typeof data !== 'object' || !('id' in data)) {
      throw new Error('Invalid JWT token');
    }

    user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    return [null, user];
  } catch (err:any) {
    return [err.message, null];
  }
};


export { verifyJWTandCheckUser };
