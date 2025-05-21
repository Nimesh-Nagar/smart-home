import pool from '../config/db.config.js';

// Create a new manufacturer
export const createManufacturer = async (req, res, next) => {
  const { name, contact_email, website, support_phone } = req.body;

  try {
    const existing = await pool.query('SELECT * FROM manufacturers WHERE name = $1', [name]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ msg: 'Manufacturer already exists' });
    }

    const result = await pool.query(
      `INSERT INTO manufacturers (name, contact_email, website, support_phone)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, contact_email, website, support_phone]
    );

    res.status(201).json(result.rows[0]);
  } 
  catch (error) {
    next(error);
  }
};

// Get a single manufacturer by ID
export const getManufacturerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM manufacturers WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Manufacturer not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Get all manufacturers
export const getAllManufacturers = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM manufacturers ORDER BY id');
    res.status(200).json(result.rows);
  } 
  catch (error) {
    next(error);
  }
};



// Update a manufacturer
export const updateManufacturer = async (req, res, next) => {
  const { id } = req.params;
  const { name, contact_email, website, support_phone } = req.body;

  try {
    const existing = await pool.query('SELECT * FROM manufacturers WHERE id = $1', [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ msg: 'Manufacturer not found' });
    }

    const updated = await pool.query(
      `UPDATE manufacturers
       SET name = $1,
           contact_email = $2,
           website = $3,
           support_phone = $4,
           updated_at = CURRENT_TIMESTAMP,
           record_version = record_version + 1
       WHERE id = $5
       RETURNING *`,
      [name, contact_email, website, support_phone, id]
    );

    res.status(200).json(updated.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Delete a manufacturer
export const deleteManufacturer = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM manufacturers WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Manufacturer not found or already deleted' });
    }

    res.status(200).json({ msg: 'Manufacturer deleted successfully' });
  } catch (error) {
    next(error);
  }
};
