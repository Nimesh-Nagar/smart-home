import pool from '../config/db.config.js' 


// Create a role
export const createRole = async (req, res, next) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO roles (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } 
  catch (error) {
    next(error);
  }
};


// Get role by ID
export const getRoleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Get all roles
export const getAllRoles = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM roles');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Update role
export const updateRole = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query(
      'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Delete role
export const deleteRole = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM roles WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role deleted', role: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
