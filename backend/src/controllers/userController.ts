import { Request, Response } from 'express';
import { getUserByUsername, createUser, updateUser, deleteUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await createUser(username, password);
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send('Error creating user');
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);

  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '2d' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { password, bio } = req.body;
  const userId = req.user?.id;  // Now TypeScript recognizes req.user

  if (!userId) {
    return res.status(400).send('User not found');
  }

  try {
    await updateUser(userId, password, bio);
    res.send('User updated');
  } catch (err) {
    res.status(500).send('Error updating user');
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.user?.id;  // Now TypeScript recognizes req.user

  if (!userId) {
    return res.status(400).send('User not found');
  }

  try {
    await deleteUser(userId);
    res.send('User deleted');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
};
