const { Pool} = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: `postgresql://roman:grtb342fs@localhost:5432/inventory_app`
})

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM categories WHERE parent_id IS NULL ORDER BY id');
    // console.log(rows)
    return rows;
}

async function getSubCategories(s_id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE parent_id = $1 ORDER BY id', [s_id]);
    // console.log(rows)
    return rows;
}

async function getItems(i_id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1 ORDER BY id', [i_id]);
    // console.log(rows)
    return rows;
}

async function addCategory(c_name, c_id) {
    await pool.query('INSERT INTO categories (name, parent_id) VALUES ($1, $2)', [c_name, c_id]);
}

async function addItem(i_name, c_id) {
    await pool.query('INSERT INTO items (name, category_id) VALUES ($1, $2)', [i_name, c_id]);
}

async function updateCategory(c_name, c_id) {
    await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [c_name, c_id]);
}

async function updateItem(i_name, i_id, i_img) {
    await pool.query('UPDATE items SET name = $1, image_url = $3 WHERE id = $2', [i_name, i_id, i_img]);
}

async function deleteCategory(c_id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [c_id]);
}

async function deleteItem(i_id) {
    const { rows } = await pool.query('SELECT image_url FROM items WHERE id = $1', [i_id]);
    if (typeof(rows[0].image_url) === 'string') {
        const filePath = path.join(__dirname, '../public', rows[0].image_url);
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete image:', err);
        })
    }
    await pool.query('DELETE FROM items WHERE id = $1', [i_id]);
}

module.exports = {
    getCategories,
    getSubCategories,
    getItems,
    addCategory,
    addItem,
    updateCategory,
    updateItem,
    deleteCategory,
    deleteItem
}