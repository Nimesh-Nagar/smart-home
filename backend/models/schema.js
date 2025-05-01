import pool from '../config/db.config.js' 

const initSchema = async () => {
    try {

        // SQL schema.
        await pool.query(
        `
        CREATE TABLE IF NOT EXISTS manufacturers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        contact_email VARCHAR(100),
        website TEXT,
        support_phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role_id INT REFERENCES roles(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location TEXT,
        user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS device_types (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        manufacturer_id INT REFERENCES manufacturers(id),
        protocol VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS devices (
        id SERIAL PRIMARY KEY,
        device_type_id INT REFERENCES device_types(id),
        user_id INT REFERENCES users(id),
        room_id INT REFERENCES rooms(id),
        name VARCHAR(100),
        serial_number VARCHAR(100) UNIQUE,
        status VARCHAR(20) DEFAULT 'offline',
        firmware_version VARCHAR(50),
        manufacturer_id INT REFERENCES manufacturers(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS device_logs (
        id SERIAL PRIMARY KEY,
        device_id INT REFERENCES devices(id),
        action VARCHAR(255),
        value VARCHAR(100),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS anomalies (
        id SERIAL PRIMARY KEY,
        device_id INT REFERENCES devices(id),
        room_id INT REFERENCES rooms(id),
        anomaly_type VARCHAR(100),
        description TEXT,
        severity VARCHAR(10),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS firmware (
        id SERIAL PRIMARY KEY,
        version VARCHAR(50) NOT NULL,
        file_url TEXT,
        release_notes TEXT,
        manufacturer_id INT REFERENCES manufacturers(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS firmware_updates (
        id SERIAL PRIMARY KEY,
        device_id INT REFERENCES devices(id),
        firmware_id INT REFERENCES firmware(id),
        status VARCHAR(20) DEFAULT 'pending',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS device_networks (
        id SERIAL PRIMARY KEY,
        device_id INT REFERENCES devices(id) ON DELETE CASCADE,
        network_type VARCHAR(20),
        ssid VARCHAR(100),
        bssid VARCHAR(100),
        signal_strength INT,
        ip_address VARCHAR(45),
        mac_address VARCHAR(100),
        public_ip VARCHAR(45),
        carrier VARCHAR(100),
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        schema_version INT DEFAULT 1,
        record_version INT DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS schema_versions (
        id SERIAL PRIMARY KEY,
        table_name VARCHAR(100) NOT NULL,
        version INT NOT NULL,
        migration_description TEXT,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

    `)
    console.log('All tables created or already exist.');
        
    } catch (error) {
        console.log(error)
        
    }

}

export default initSchema;