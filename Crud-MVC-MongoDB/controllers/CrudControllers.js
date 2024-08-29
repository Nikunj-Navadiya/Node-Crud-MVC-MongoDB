const CrudModel = require('../models/CrudModel');

const fs = require('fs');

const index = async (req, res) => {
    try {
        let users = await CrudModel.find({});
        return res.render('table', {
            users
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addform = (req, res) => {
    return res.render('form');
}

const insertRecord = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await CrudModel.create({
            name: name,
            description: description,
            price: price,
            image: req.file.path
        })
        console.log(`user add`);
        return res.redirect('/crud');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteRecord = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await CrudModel.findById(id);
        fs.unlinkSync(single.image);
        await CrudModel.findByIdAndDelete(id);
        console.log(`user delete`)
        return res.redirect('/crud');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const editRecord = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await CrudModel.findById(id);
        return res.render('edit', {
            single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateRecord = async (req, res) => {
    try {
        const { editid, name, description, price } = req.body;
        if (req.file) {
            let single = await CrudModel.findById(editid);
            fs.unlinkSync(single.image);
            await CrudModel.findByIdAndUpdate(editid, {
                name: name,
                description: description,
                price: price,
                image: req.file.path
            })
            console.log("record update");
            return res.redirect('/crud');
        } else {
            let single = await CrudModel.findById(editid);
            await CrudModel.findByIdAndUpdate(editid, {
                name: name,
                description: description,
                price: price,
                image: single.image
            })
            console.log("record update");
            return res.redirect('/crud');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    index, addform, insertRecord, deleteRecord, editRecord, updateRecord
}