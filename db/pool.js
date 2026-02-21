const { Pool} = require('pg');
const password = process.env.DB_PASSWORD;

module.exports = new Pool({
    connectionString: `postgresql://roman:${password}@localhost:5432/inventory_app`
})