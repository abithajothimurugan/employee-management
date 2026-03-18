const express = require("express");
const cors = require("cors");

const { connectDB } = require('./db/db')
const employeeRouter = require('./Route/employeeRoute')
const app = express();

app.use(cors());
app.use(express.json());
connectDB()

app.use('/uploads', express.static('uploads/profile')); 
app.use('/api/emp', employeeRouter)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});