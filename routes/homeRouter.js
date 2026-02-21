const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/images/items',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

const homeRouter = Router();

const controllers = require('../controllers/homeController');

homeRouter.get('/', controllers.getHome);

homeRouter.post('/category', controllers.addCategory);
homeRouter.post('/subCategory', controllers.addSubCategory);
homeRouter.post('/item', controllers.addItem);

homeRouter.post('/update/category/:id', controllers.updateCategory);
homeRouter.post('/update/subCategory/:id', controllers.updateSubCategory);
homeRouter.post('/update/item/:id', upload.single('itemImg'), controllers.updateItem);

homeRouter.post('/delete/category/:id', controllers.deleteCategory);
homeRouter.post('/delete/subCategory/:id', controllers.deleteSubCategory);
homeRouter.post('/delete/item/:id', controllers.deleteItem);

module.exports = homeRouter;