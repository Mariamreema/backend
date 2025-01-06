const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const surveyRoutes = require('./routes/surveyRoutes'); // Import survey routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;
app.get('/',(req,res)=>{
    res.send('server is running  hi how are you reema')
})

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MongoDB URI is missing in .env file!');
    process.exit(1);
}
mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });

// Register Routes
app.use('/api/surveys', surveyRoutes); // Mount survey routes at /api/surveys

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//----------------------------------------------
