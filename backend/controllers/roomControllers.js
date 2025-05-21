import pool from '../config/db.config.js';

// Create Room 
export const createRoom = async (req, res) => {
  const { name, location, user_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO rooms (name, location, user_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, location, user_id]
    );

    res.status(201).json(result.rows[0]);

  } 
  catch (error) {
    console.error('Error creating room:', error);
    next(error);
  }
};

// Get a single room by ID 
export const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
        'SELECT * FROM rooms WHERE id = $1', [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(result.rows[0]);

  } 
  catch (error) {
    console.error('Error fetching room:', error);
    next(error);
  }
};

// Get all Rooms
export const getAllRooms = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms');
    res.status(200).json(result.rows);
  } 
  catch (error) {
    console.error('Error fetching rooms:', error);
    next(error);
  }
};




export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, location, user_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE rooms SET name = $1, location = $2, user_id = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 RETURNING *`,
      [name, location, user_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(result.rows[0]);

  } 
  catch (error) {
    console.error('Error updating room:', error);
    next(error);
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
        'DELETE FROM rooms WHERE id = $1 RETURNING *', [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.status(200).json({ message: 'Room deleted successfully' });
  }

  catch (error) {
    console.error('Error deleting room:', error);
    next(error);
  }

};