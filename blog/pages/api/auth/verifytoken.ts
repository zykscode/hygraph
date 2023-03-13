
import { verifyJWTandCheckUser } from "#/lib/userFromJWT";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message?: string; data?: any }>
) => {
  if (_req.method != "GET") {
    res.status(405).json({
      success: false,
      message: "Invalid Method",
    });
    return;
  }

  try {
    const token = _req.headers.token as string;
    if (!token) {
      throw new Error("Token not available");
    }
    const [error, user] = await verifyJWTandCheckUser(token);
    if (error) {
      res.status(401).json({
        success: false,
        message: error,
      });
      return;
    }

    res.status(202).json({
      success: true,
      data: user,
    });
  } catch (error: unknown) {
    res.status(401).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export default handler;
