const express = require('express');

const routes = express.Router();

const crudcontroller = require('../controllers/CrudControllers')

const multer = require('multer');
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
})
const fileUpload = multer({ storage: st }).single('image');

routes.get('/', crudcontroller.index)
routes.get('/add', crudcontroller.addform)
routes.post('/insertRecord', fileUpload, crudcontroller.insertRecord);
routes.get('/deleteRecord', crudcontroller.deleteRecord);
routes.get('/editRecord', crudcontroller.editRecord);
routes.post('/updateRecord', fileUpload, crudcontroller.updateRecord);

module.exports = routes;