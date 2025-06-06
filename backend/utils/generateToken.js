import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
    },
    process.env.JWT_SECRET || 'home-automation-app',
    { expiresIn: '1d' }
  );
};
