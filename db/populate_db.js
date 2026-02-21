const { Client } = require('pg');

const SQL = `
    CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL,
        parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS items(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        image_url TEXT
    );

    
`;

async function seed() {
    const client = new Client({
        connectionString: `postgresql://roman:grtb342fs@localhost:5432/inventory_app`
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
}

seed();