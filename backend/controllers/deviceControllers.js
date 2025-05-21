import pool from '../config/db.config.js';

// Create new Device 
export const createDevice = async (req, res, next) => {
    try {
        const {
            device_type_id,
            user_id,
            room_id,
            name,
            serial_number,
            firmware_version,
            manufacturer_id
        } = req.body;

        const result = await pool.query(
            `INSERT INTO devices 
            (device_type_id, user_id, room_id, name, serial_number, firmware_version, manufacturer_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [device_type_id, user_id, room_id, name, serial_number, firmware_version, manufacturer_id]
        );

        res.status(201).json(result.rows[0]);

    } 
    catch (error) {
        next(error);
    }

};


// Get Device by its ID 
export const getDeviceById = async(req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM devices WHERE id = $1`, [req.params.id]
        ); 
        if (result.rows.length === 0) return res.status(404).json({ message: 'Device not found' });

        res.status(200).json(result.rows[0]);
    } 
    catch (error) {
        next(error)
    }

};


// Get all the devices in database
export const getAllDevices = async(req, res, next) => {
    try{
        const result = await pool.query(`
            SELECT d.*, dt.name AS device_type, r.name AS room, u.name AS owner, m.name AS manufacturer 
            FROM devices d 
            JOIN device_types dt ON d.device_type_id = dt.id
            JOIN rooms r ON d.room_id = r.id
            JOIN users u ON d.user_id = u.id
            JOIN manufacturers m ON d.manufacturer_id = m.id
        `);
    
        res.status(200).json(result.rows);
    }

    catch (error) {
        next(error)    
    }

};

// --------------------- 

// Update device
export const updateDevice = async (req, res, next) => {
  const { id } = req.params;
  const {
    device_type_id,
    user_id,
    room_id,
    name,
    serial_number,
    firmware_version,
    manufacturer_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE devices SET 
        device_type_id = $1,
        user_id = $2,
        room_id = $3,
        name = $4,
        serial_number = $5,
        firmware_version = $6,
        manufacturer_id = $7,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [device_type_id, user_id, room_id, name, serial_number, firmware_version, manufacturer_id, id]
    );
    
    if (result.rows.length === 0) return res.status(404).json({ message: 'Device not found' });
    res.status(200).json(result.rows[0]);
  } 
  catch (error) {
    next(error);
  }
};


// Delete device
export const deleteDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM devices WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0){
        return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({ message: 'Device deleted', device: result.rows[0] });

  } 
  catch (error) {
    next(error);
  }
};