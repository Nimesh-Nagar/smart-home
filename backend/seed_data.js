// File: seed.js
import pool from './config/test_db.js'; // assuming you have a db.js file exporting the pg pool

const seed = async () => {
  try {
    // 1. Seed Roles
    const roles = ['admin', 'guest'];
    const roleIds = [];
    for (const role of roles) {
      const res = await pool.query(
        'INSERT INTO roles (name) VALUES ($1) RETURNING id',
        [role]
      );
      roleIds.push(res.rows[0].id);
    }

    // 2. Seed Users
    const users = [
      { name: 'nimesh' ,email: 'admin@example.com', password: 'hashedadmin', role_id: roleIds[0] },
      { name: 'guest', email: 'guest@example.com', password: 'hashedguest', role_id: roleIds[1] }
    ];
    const userIds = [];
    for (const user of users) {
      const res = await pool.query(
        'INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3) RETURNING id',
        [user.name, user.email, user.password, user.role_id]
      );
      userIds.push(res.rows[0].id);
    }

    // 3. Seed Manufacturers
    const manufacturers = [
      { name: 'Philips', contact_email: 'support@philips.com', website: 'https://philips.com', support_phone: '1800-111-222' },
      { name: 'Xiaomi', contact_email: 'support@xiaomi.com', website: 'https://mi.com', support_phone: '1800-333-444' }
    ];
    const manufacturerIds = [];
    for (const m of manufacturers) {
      const res = await pool.query(
        'INSERT INTO manufacturers (name, contact_email, website, support_phone) VALUES ($1, $2, $3, $4) RETURNING id',
        [m.name, m.contact_email, m.website, m.support_phone]
      );
      manufacturerIds.push(res.rows[0].id);
    }

    // 4. Seed Device Types
    const deviceTypes = [
      { name: 'Smart Bulb', description: 'WiFi-enabled LED bulb', manufacturer_id: manufacturerIds[0], protocol: 'mqtt' },
      { name: 'Smart Switch', description: 'WiFi-enabled smart switch', manufacturer_id: manufacturerIds[1], protocol: 'mqtt' }
    ];
    const deviceTypeIds = [];
    for (const d of deviceTypes) {
      const res = await pool.query(
        'INSERT INTO device_types (name, description, manufacturer_id, protocol) VALUES ($1, $2, $3, $4) RETURNING id',
        [d.name, d.description, d.manufacturer_id, d.protocol]
      );
      deviceTypeIds.push(res.rows[0].id);
    }

    // 5. Seed Rooms
    const rooms = [
      { name: 'Living Room', location: 'Ground Floor', user_id: userIds[0] },
      { name: 'Bedroom', location: 'First Floor', user_id: userIds[1] }
    ];
    const roomIds = [];
    for (const r of rooms) {
      const res = await pool.query(
        'INSERT INTO rooms (name, location, user_id) VALUES ($1, $2, $3) RETURNING id',
        [r.name, r.location, r.user_id]
      );
      roomIds.push(res.rows[0].id);
    }

    // 6. Seed Devices
    const devices = [
      {
        device_type_id: deviceTypeIds[0],
        user_id: userIds[0],
        room_id: roomIds[0],
        name: 'Philips LED 1',
        serial_number: 'PHBULB001',
        status: 'online',
        firmware_version: 'v1.0',
        manufacturer_id: manufacturerIds[0]
      },
      {
        device_type_id: deviceTypeIds[1],
        user_id: userIds[1],
        room_id: roomIds[1],
        name: 'Xiaomi Switch 1',
        serial_number: 'MISWITCH001',
        status: 'offline',
        firmware_version: 'v1.1',
        manufacturer_id: manufacturerIds[1]
      }
    ];

    for (const d of devices) {
      await pool.query(
        'INSERT INTO devices (device_type_id, user_id, room_id, name, serial_number, status, firmware_version, manufacturer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [
          d.device_type_id,
          d.user_id,
          d.room_id,
          d.name,
          d.serial_number,
          d.status,
          d.firmware_version,
          d.manufacturer_id
        ]
      );
    }

    console.log('✅ Database seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seed();
