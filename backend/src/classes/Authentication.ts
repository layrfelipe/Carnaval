import "dotenv/config";
import jwt from "jsonwebtoken";

export default abstract class Authentication {
  public generateAcessToken(params={}) {
    return jwt.sign(params, encodeURIComponent(process.env.ACESS_TOKEN_SECRET!), { expiresIn: 60 });
  }

  public generateRefreshToken(params={}) {
    return jwt.sign(params, encodeURIComponent(process.env.REFRESH_TOKEN_SECRET!), { expiresIn: 86400 });
  }
}