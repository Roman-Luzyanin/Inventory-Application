const db = require('../db/queries');

async function getHome(req, res) {
    const categoryId = req.query.categoryId || null;
    const subCategoryId = req.query.subCategoryId || null;
    const itemId = req.query.itemId || null;

    const categories = await db.getCategories();
    const subCategories =  categoryId ? await db.getSubCategories(categoryId) : [];
    const items =  subCategoryId ? await db.getItems(subCategoryId) : [];

    const category = categories.find(cat => cat.id == categoryId);
    const subCategory = subCategories.find(cat => cat.id == subCategoryId);
    const item = items.find(item => item.id == itemId);

    res.render('home', {categories, subCategories, items,
                        categoryId, subCategoryId, itemId,
                        category, subCategory, item});
}

async function addCategory(req, res) {
    await db.addCategory(req.body.newCategory, null, null);
    res.redirect('/');
}

async function addSubCategory(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    await db.addCategory(req.body.newSubCategory, req.body.categoryId, imagePath);
    res.redirect(`/?categoryId=${req.body.categoryId}`);
}

async function addItem(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    await db.addItem(req.body.newItem, req.body.subCategoryId, imagePath);
    res.redirect(`/?categoryId=${req.body.categoryId}&subCategoryId=${req.body.subCategoryId}`)
}

async function updateCategory(req, res) {
    await db.updateCategory(req.params.id, req.body.name, null);
    res.redirect(`/?categoryId=${req.params.id}`);
}

async function updateSubCategory(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    await db.updateCategory(req.params.id, req.body.name, imagePath, req.body.removeImg);
    res.redirect(`/?categoryId=${req.body.parent_id}`);
}

async function updateItem(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    await db.updateItem(req.params.id, req.body.name, imagePath, req.body.removeImg);
    res.redirect(`/?categoryId=${req.body.categoryId}` + 
                    `&subCategoryId=${req.body.subCategoryId}` +
                     `&itemId=${req.body.itemId}`);
}

async function deleteCategory(req, res) {
    await db.deleteCategory(req.params.id);
    res.redirect('/');
}

async function deleteSubCategory(req, res) {
    await db.deleteCategory(req.params.id);
    res.redirect(`/?categoryId=${req.body.categoryId}`);
}

async function deleteItem(req, res) {
    await db.deleteItem(req.params.id);
    res.redirect(`/?categoryId=${req.body.categoryId}&subCategoryId=${req.body.subCategoryId}`);
}

module.exports = {
    getHome,
    addCategory,
    addSubCategory,
    addItem,
    updateCategory,
    updateSubCategory,
    updateItem,
    deleteCategory,
    deleteSubCategory,
    deleteItem
}