const { Pool} = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: `postgresql://roman:grtb342fs@localhost:5432/inventory_app`
})

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM categories WHERE parent_id IS NULL ORDER BY position');
    // console.log(rows)
    return rows;
}

async function getPositions() {
    const { rows } = await pool.query('SELECT * FROM categories WHERE parent_id IS NULL ORDER BY position');
    const positions = rows.map(i => i.position);
    // console.log(positions)
    return positions;
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

async function getPromoItems() {
    const { rows } = await pool.query('SELECT * FROM items WHERE promote = TRUE');
    // console.log(rows)
    return rows;
}

async function addCategory(c_name, p_id, c_img) {
    await pool.query('INSERT INTO categories (name, parent_id, image_url) VALUES ($1, $2, $3)', [c_name, p_id, c_img]);
}

async function addItem(i_name, r_id, c_id, i_img, i_desc, i_prom) {
    await pool.query('INSERT INTO items (name, root_id, category_id, image_url, description, promote) VALUES ($1, $2, $3, $4, $5, $6)', [i_name, r_id, c_id, i_img, i_desc, i_prom]);
}

async function updateCategoryPosition(val_1, val_2) {
    await pool.query('UPDATE categories SET position = CASE WHEN position = $1 THEN $2 WHEN position = $2 THEN $1 END WHERE position IN ($1, $2)', [val_1, val_2]);
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
        console.log(oldPath)
        fs.unlink(oldPath, (err)=>{
            if (err) console.error('Failed to delete image:', err);
        });
    }
    
    await pool.query('UPDATE categories SET name = $2, image_url = $3 WHERE id = $1', [c_id, c_name, newPath]);
}

async function updateItem(i_id, i_name, i_img, i_desc, i_prom, i_del) {
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

    await pool.query('UPDATE items SET name = $2, image_url = $3, description = $4, promote = $5 WHERE id = $1', [i_id, i_name, newPath, i_desc, i_prom]);
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

async function deleteCategoryCheck(c_id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE parent_id = $1', [c_id]);
    return rows;
}
async function deleteSubCategoryCheck(c_id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [c_id]);
    return rows;
}

async function searchItems(i_name, c_id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE name ILIKE $1 AND category_id = $2', [`${i_name}%`, c_id]);
    // console.log(rows)
    return rows;
}

async function searchSubCategories(c_name, p_id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE name ILIKE $1 AND parent_id = $2', [`${c_name}%`, p_id]);
    return rows;
}

async function searchPromoItems(i_name) {
    const { rows } = await pool.query('SELECT * FROM items WHERE name ILIKE $1 AND promote = TRUE', [`${i_name}%`]);
    return rows;
}

module.exports = {
    getCategories,
    getPositions,
    getSubCategories,
    getItems,
    getPromoItems,
    addCategory,
    addItem,
    updateCategoryPosition,
    updateCategory,
    updateItem,
    deleteCategory,
    deleteItem,
    deleteCategoryCheck,
    deleteSubCategoryCheck,
    searchItems,
    searchSubCategories,
    searchPromoItems
}