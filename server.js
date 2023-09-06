const express =  require('express')
const dotenv = require('dotenv')
const colors =  require('colors')
const morgan = require('morgan')
const cors  = require('cors')
const { connect } = require('mongoose')
const connectDB = require('./config/db')

//dot config
dotenv.config();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

//mongoDb conneections
connectDB();

//routes
app.use("/api/v1",require('./routes/testRoutes'));
app.use("/api/v1/auth",require('./routes/authRoutes'));
app.use("/api/v1/inventory",require('./routes/inventoryRoutes'));
app.use("/api/v1/analytics",require("./routes/analyticRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));




const PORT =  process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Node Server Running In ${process.env.DEV_MODE} on ${PORT}`);
} )