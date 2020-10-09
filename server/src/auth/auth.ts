import jwt from 'jsonwebtoken';
import express from 'express';

const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const headerToken: string = req.headers.authorization?.split(' ')[1]!;
    const verifiedToken = await jwt.verify(headerToken, process.env.JWT_TOKEN!);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Auth failed' });
  }
};

export default module.exports = auth;
