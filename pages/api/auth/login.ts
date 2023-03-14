import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken"; // added Secret type import
import { envVariables } from "#/lib/jwt";


const { JWT_KEY, ACCESS_COOKIE_EXPIRY } = envVariables;

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (_req.method != "POST") {
    res.status(405).json({
      success: false,
      message: "Invalid Method",
    });
    return;
  }

  try {
    const { email, password } = _req.body;

    if (!(email && password)) {
      res.status(400).json({
        success: false,
        message: "Compulsory fields are not filled!",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user === null) {
      res.status(404).json({
        success: false,
        message: "User not available",
      });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Password is not Correct",
      });
      return;
    }
   
    const secret: Secret = JWT_KEY ?? ''; // assign empty string as default value
    const token = jwt.sign(
      {
        id: user["id"],
        name: user["first_name"],
      },
      secret,
      {
        expiresIn: "24h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      `token=${token}; path=/; expires=${new Date(
        Date.now() + ACCESS_COOKIE_EXPIRY
      ).toUTCString()}`
    );

    res.status(201).json({
      success: true,
      message: "Credentials Accepted",
      token: token,
      data: {
        ...user,
        password:undefined
      },
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  return;
};

export default handler;
