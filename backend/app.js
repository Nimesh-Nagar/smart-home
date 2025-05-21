import express from 'express' 
import dotenv from 'dotenv' 

import pool from './config/db.config.js'
import initSchema from './models/schema.js' 

import deviceRoutes from './routes/devices.js'
import deviceTypeRoutes from './routes/device_types.js'
import manufRoutes from './routes/manufacturers.js'
import roleRoutes from './routes/roles.js'
import roomsRoutes from './routes/rooms.js'
import userRoutes from './routes/users.js'

dotenv.config()
const app = express();

// read data fron env variables
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Error Handling Middlewares
import {errorHandlerMiddleware} from './middleware/error-handler.js'
import {notFound} from './middleware/not-found.js'


//routes
app.get('/', (req,res) => {
    res.send("<h1> Smart Home Dashboard </h1>")
}); 

app.use('/api/devices', deviceRoutes);
app.use('/api/deviceType', deviceTypeRoutes);
app.use('/api/manufacturers', manufRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/users', userRoutes);

//product route
app.use(errorHandlerMiddleware);
app.use(notFound)

// initilise DataBase Schema
initSchema();

const start = async () => {
    try {

        const connectDB = await pool.query("SELECT current_database()")
        console.log(`Connected to Database : ${connectDB.rows[0].current_database}`);

        app.listen(port , () => {
            console.log(`Server is running on port : ${port}`);
        });

    } catch (error) {
        console.log(error)        
    }
    
}

start()