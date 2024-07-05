import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//@ts-ignore
    const token = req.cookies.token; 
    console.log(token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
  
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      //@ts-ignore
      req.user = payload;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };
  
  export const authorizeRole = (roles : string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    };
  };

