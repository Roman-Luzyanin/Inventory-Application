const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const imgValidation = (req, file, cb) => {
    const allowed = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG, PNG, WEBP images are allowed'), false);
    }
} 

const upload = multer({ 
    storage,
    imgValidation,
    limits: {fileSize: 10 * 1024 * 1024} 
});

const homeRouter = Router();

const controllers = require('../controllers/homeController');

homeRouter.get('/', controllers.getHome);

homeRouter.post('/category', controllers.addCategory);
homeRouter.post('/subCategory', controllers.addSubCategory);
homeRouter.post('/item', controllers.addItem);

homeRouter.post('/update/category/:id', controllers.updateCategory);
homeRouter.post('/update/subCategory/:id', controllers.updateSubCategory);
homeRouter.post('/update/item/:id', upload.single('image'), controllers.updateItem);

homeRouter.post('/delete/category/:id', controllers.deleteCategory);
homeRouter.post('/delete/subCategory/:id', controllers.deleteSubCategory);
homeRouter.post('/delete/item/:id', controllers.deleteItem);

module.exports = homeRouter;