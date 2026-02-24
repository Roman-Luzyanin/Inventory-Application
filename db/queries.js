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

async function addCategory(c_name, p_id, c_img) {
    await pool.query('INSERT INTO categories (name, parent_id, image_url) VALUES ($1, $2, $3)', [c_name, p_id, c_img]);
}

async function addItem(i_name, c_id, i_img) {
    await pool.query('INSERT INTO items (name, category_id, image_url) VALUES ($1, $2, $3)', [i_name, c_id, i_img]);
}

async function updateCategory(c_id, c_name, c_img, i_del) {
    const { rows } = await pool.query('SELECT image_url FROM categories WHERE id = $1', [c_id]);
    let oldPath = rows[0].image_url;
    let newPath = oldPath;
    if (c_img) {
        newPath = c_img;
        if (oldPath) {
            oldPath = path.join(__dirname, '../public', oldPath);
            fs.unlink(oldPath, (err)=>{
                if (err) console.error('Failed to delete image:', err);
            });
        }
    } else if (i_del) {
        newPath = null;
        oldPath = path.join(__dirname, '../public', oldPath);
        fs.unlink(oldPath, (err)=>{
            if (err) console.error('Failed to delete image:', err);
        });
    }
    
    await pool.query('UPDATE categories SET name = $2, image_url = $3 WHERE id = $1', [c_id, c_name, newPath]);
}

async function updateItem(i_id, i_name, i_img, i_del) {
    const { rows } = await pool.query('SELECT image_url FROM items WHERE id = $1', [i_id]);
    let oldPath = rows[0].image_url;
    let newPath = oldPath;
    if (i_img) {
        newPath = i_img;
        if (oldPath) {
            oldPath = path.join(__dirname, '../public', oldPath);
            fs.unlink(oldPath, (err)=>{
                if (err) console.error('Failed to delete image:', err);
            });
        }
    } else if (i_del) {
        newPath = null;
        oldPath = path.join(__dirname, '../public', oldPath);
        fs.unlink(oldPath, (err)=>{
            if (err) console.error('Failed to delete image:', err);
        });
    }

    await pool.query('UPDATE items SET name = $2, image_url = $3 WHERE id = $1', [i_id, i_name, newPath]);
}

async function deleteCategory(c_id) {
    const { rows } = await pool.query('SELECT image_url FROM categories WHERE id = $1', [c_id]);
    if (rows[0].image_url) {
        const filePath = path.join(__dirname, '../public', rows[0].image_url);
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete image:', err);
        })
    }
    await pool.query('DELETE FROM categories WHERE id = $1', [c_id]);
}

async function deleteItem(i_id) {
    const { rows } = await pool.query('SELECT image_url FROM items WHERE id = $1', [i_id]);
    if (rows[0].image_url) {
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