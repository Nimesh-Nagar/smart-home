
import { Pool } from "pg"

const pool = new Pool({
    user: "postgres",
    host:"localhost",
    database: "test_db",
    password: "pgadmin",
    port: 5433,

});

export default pool 


