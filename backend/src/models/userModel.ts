import db from './db';
import { RowDataPacket } from 'mysql2';

interface User {
  id: number;
  username: string;
  password: string;
  bio: string;
}

// Function to get a user by username
export const getUserByUsername = async (username: string): Promise<User | undefined> => {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
  return rows.length > 0 ? (rows[0] as User) : undefined;
};

// Function to create a new user
export const createUser = async (username: string, password: string): Promise<void> => {
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};

// Function to update a user's password and bio
export const updateUser = async (id: number, password: string, bio: string): Promise<void> => {
  await db.query('UPDATE users SET password = ?, bio = ? WHERE id = ?', [password, bio, id]);
};

// Function to delete a user
export const deleteUser = async (id: number): Promise<void> => {
  await db.query('DELETE FROM users WHERE id = ?', [id]);
};
