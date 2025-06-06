SELECT * FROM roles;
SELECT * FROM users;
SELECT * FROM rooms;
SELECT * FROM manufacturers;
SELECT * FROM device_types;
SELECT * FROM devices;


SELECT d.*, dt.name AS device_type, r.name AS room, u.name AS owner, m.name AS manufacturer 
FROM devices d 
            JOIN device_types dt ON d.device_type_id = dt.id
            JOIN rooms r ON d.room_id = r.id
            JOIN users u ON d.user_id = u.id
            JOIN manufacturers m ON d.manufacturer_id = m.id