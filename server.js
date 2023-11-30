// Environment Variables
require('dotenv').config();

const { app } = require('./src/app');

// Models
const {initModels} = require('./src/models/initModels');

// Utils
const { db } = require('./src/utils/database');

// Authenticate database credentials
db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err))

// Include model
initModels();

//  Sync sequelize models
// db.sync({force:true}) // Destroy table if it exists
db.sync()
    .then(() => console.log("Database synced"))
    .catch((err) => console.log(err));


const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`);
});