import pool from '../config/db.config.js';

// Create new Device 
export const createDeviceType = async (req, res, next) => {
    try {
        const {
            name,
            description,
            manufacturer_id,
            protocol
        } = req.body;

        const result = await pool.query(
            `INSERT INTO device_types 
            (name, description, manufacturer_id, protocol) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, description, manufacturer_id, protocol]
        );

        res.status(201).json(result.rows[0]);

    } 
    catch (error) {
        next(error);
    }

};


// Get Device by its ID 
export const getDeviceTypeById = async(req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM device_types WHERE id = $1`, [req.params.id]
        ); 
        if (result.rows.length === 0) return res.status(404).json({ message: 'Device Type not found' });

        res.status(200).json(result.rows[0]);
    } 
    catch (error) {
        next(error)
    }

};


// Get all the devices in database
export const getAllDeviceTypes = async(req, res, next) => {
    try{
        const result = await pool.query(
            `SELECT * FROM device_types`
        );
    
        res.status(200).json(result.rows);
    }

    catch (error) {
        next(error)    
    }

};

// --------------------- 

// Update device
export const updateDeviceType = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    manufacturer_id,
    protocol
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE device_types SET 
        name = $1,
        description = $2,
        manufacturer_id = $3,
        protocol = $4,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [name, description, manufacturer_id, protocol, id]
    );
    
    if (result.rows.length === 0) return res.status(404).json({ message: 'Device Type not found' });
    res.status(200).json(result.rows[0]);
  } 
  catch (error) {
    next(error);
  }
};


// Delete device
export const deleteDeviceType = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM device_types WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0){
        return res.status(404).json({ message: 'Device Type not found' });
    }

    res.status(200).json({ message: 'Device Type deleted', device: result.rows[0] });

  } 
  catch (error) {
    next(error);
  }
};