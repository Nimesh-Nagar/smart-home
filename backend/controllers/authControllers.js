import bcrypt from 'bcrypt';
import db from '../config/db.config.js';
import { generateToken } from '../utils/generateToken.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

    if (!user) return res.status(401).json({ msg: 'Invalid email or password' });

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password

    if (!isMatch) return res.status(401).json({ msg: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email, role_id: user.role_id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
