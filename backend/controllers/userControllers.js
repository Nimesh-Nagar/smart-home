import pool from '../config/db.config.js';

// Create a user
export const createUser = async (req, res, next) => {
  const { name, email, password, role_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, password, role_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID
export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(result.rows[0]);
  } 
  catch (error) {
    next(error);
  }
};

// Get all users with role names
export const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT u.*, r.name AS role
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `);
    res.status(200).json(result.rows);
  } 
  catch (error) {
    next(error);
  }
};



// Update user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, role_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET 
         name = $1,
         email = $2,
         password = $3,
         role_id = $4,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [name, email, password, role_id, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(result.rows[0]);
  } 
  catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted', user: result.rows[0] });
  } 
  catch (error) {
    next(error);
  }
};
