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

    const promo = await db.getPromoItems();

    const searchedItems = await db.searchItems(req.query.searchedName, req.query.subCategoryId);
    const searchQuery = req.query.searchedName;

    res.render('home', {categories, subCategories, items,
                        categoryId, subCategoryId, itemId,
                        category, subCategory, item, promo, searchedItems, searchQuery});
}

async function addCategory(req, res) {
    await db.addCategory(req.body.categoryName, null, null);
    res.redirect('/');
}

async function addSubCategory(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    await db.addCategory(req.body.subCategoryName, req.body.categoryId, imagePath);
    res.redirect(`/?categoryId=${req.body.categoryId}`);
}

async function addItem(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    const isPromote = req.body.isPromote ? true : false;
    await db.addItem(req.body.itemName, req.body.categoryId, req.body.subCategoryId, imagePath, req.body.description, isPromote);
    res.redirect(`/?categoryId=${req.body.categoryId}&subCategoryId=${req.body.subCategoryId}`)
}

async function updateCategory(req, res) {
    await db.updateCategory(req.params.id, req.body.name, null);
    res.redirect('/');
}

async function updateSubCategory(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    await db.updateCategory(req.params.id, req.body.name, imagePath, req.body.removeImg);
    res.redirect(`/?categoryId=${req.body.parent_id}`);
}

async function updateItem(req, res) {
    const imagePath = req.file ? `images/${req.file.filename}` : null;
    const isPromoteUpt = req.body.isPromoteUpt ? true : false;
    await db.updateItem(req.params.id, req.body.itemNameUpdate, imagePath, req.body.descriptionUpdate, isPromoteUpt, req.body.removeImg);
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