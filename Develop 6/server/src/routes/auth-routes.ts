import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },  
  }); 
  if (!user) {
    return res.status(404).send('Authentication failed');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(404).send('Authentication failed');
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '30min' });
  return res.json({token}); // Return the token in the response
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
